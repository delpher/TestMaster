using System.Collections.Concurrent;
using System.Net;
using System.Text.Json;

namespace TestingEndpointServer;

public static class TestingServer
{
    private static Thread _serverThread;
    private static ConcurrentBag<string> _endpoints;

    public static void Start(int port, CancellationToken cancellationToken)
    {
        _endpoints = new ConcurrentBag<string>();
        _serverThread = new Thread(RunHttpServer);
        _serverThread.Start(new TestingEndpointServerStartupArguments(port, cancellationToken));
    }

    public static void Register(string endpointPath)
    {
        _endpoints.Add(endpointPath);
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
        ReturnEndpointsList(context);
    }

    private static void ReturnEndpointsList(HttpListenerContext context)
    {
        context.Response.StatusCode = (int)HttpStatusCode.OK;
        context.Response.ContentType = "application/json";
        using var writer = new StreamWriter(context.Response.OutputStream);
        writer.Write(JsonSerializer.Serialize(_endpoints.ToArray()));
    }
}