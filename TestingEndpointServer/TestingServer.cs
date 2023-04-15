using System.Collections.Concurrent;
using System.Net;
using System.Text.Json;

namespace TestingEndpointServer;

public delegate object EndpointCallback();

public static class TestingServer
{
    private static Thread _serverThread;
    private static ConcurrentDictionary<string, EndpointCallback> _endpoints;

    public static void Start(int port, CancellationToken cancellationToken)
    {
        _endpoints = new ConcurrentDictionary<string, EndpointCallback>();
        _serverThread = new Thread(RunHttpServer);
        _serverThread.Start(new TestingEndpointServerStartupArguments(port, cancellationToken));
    }

    public static bool Register(string endpointPath, EndpointCallback callback)
    {
        return _endpoints.TryAdd(endpointPath, callback);
    }

    private static void RunHttpServer(object obj)
    {
        var args = (TestingEndpointServerStartupArguments)obj;
        var cancellationToken = args.CancellationToken;
        var server = new HttpListener();
        server.Prefixes.Add($"http://localhost:{args.PortNumber}/");

        cancellationToken.Register(() => server.Stop());

        server.Start();

        while (!cancellationToken.IsCancellationRequested)
        {
            var context = server.GetContext();
            ThreadPool.QueueUserWorkItem(_ => HandleRequest(context));
        }
    }

    private static void HandleRequest(HttpListenerContext context)
    {
        var endpointPath = context.Request.Url?.AbsolutePath;
        if (endpointPath == "/")
            ReturnEndpointsList(context);
        else
            HandleEndpointRequest(endpointPath?.TrimStart('/'), context);
    }

    private static void HandleEndpointRequest(string endpointPath, HttpListenerContext context)
    {
        if (_endpoints.TryGetValue(endpointPath, out var endpoint))
            WriteObjectToResponse(context, endpoint.Invoke());
        else
            RespondNotFound(endpointPath, context);
    }

    private static void RespondNotFound(string endpointPath, HttpListenerContext context)
    {
        context.Response.StatusCode = (int)HttpStatusCode.NotFound;
        context.Response.StatusDescription = "Not found";
        WriteObjectToResponse(context, new TestingServerError($"Endpoint '{endpointPath}' is not registered."));
    }

    private static void ReturnEndpointsList(HttpListenerContext context)
    {
        context.Response.StatusCode = (int)HttpStatusCode.OK;
        WriteObjectToResponse(context, _endpoints.Keys.ToArray());
    }

    private static void WriteObjectToResponse(HttpListenerContext context, object value)
    {
        context.Response.ContentType = "application/json";
        using var writer = new StreamWriter(context.Response.OutputStream);
        writer.Write(JsonSerializer.Serialize(value));
    }
}