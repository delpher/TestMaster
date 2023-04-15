using System.Collections.Concurrent;
using System.Net;

namespace TestAssist.Backend;

public class TestAssistServer
{
    private static TestAssistServer _instance;
    
    private readonly Thread _serverThread;
    private readonly ConcurrentDictionary<string, EndpointHandler> _endpoints;
    private readonly CancellationTokenSource _cancellationTokenSource;

    public static void StartServer(int port)
    {
        _instance = new TestAssistServer();
        _instance.Start(port);
    }

    public static void StopServer()
    {
        _instance.Stop();
    }

    public TestAssistServer()
    {
        _cancellationTokenSource = new CancellationTokenSource();
        _endpoints = new ConcurrentDictionary<string, EndpointHandler>();
        _serverThread = new Thread(RunHttpServer);
    }

    public void Start(int port)
    {
        _serverThread.Start(
            new TestingEndpointServerStartupArguments(port, _endpoints, _cancellationTokenSource.Token));
    }

    public bool Register(string endpointPath, Func<object> handler)
    {
        return _endpoints.TryAdd(endpointPath, new ParameterlessEndpointHandler(endpointPath, handler));
    }

    public bool Register<TParameters>(string endpointPath, Func<TParameters, object> handler)
    {
        return _endpoints.TryAdd(endpointPath, new ParametrizedEndpointHandler<TParameters>(endpointPath, handler));
    }

    private static void RunHttpServer(object obj)
    {
        var args = (TestingEndpointServerStartupArguments)obj;
        var cancellationToken = args.CancellationToken;
        var server = new HttpListener();
        server.Prefixes.Add($"http://localhost:{args.PortNumber}/");

        server.Start();

        cancellationToken.Register(() => server.Stop());

        while (!cancellationToken.IsCancellationRequested)
        {
            if (!cancellationToken.IsCancellationRequested)
            {
                var context = server.GetContext();
                ThreadPool.QueueUserWorkItem(_ => HandleRequest(args.Endpoints, context));
            }
        }
    }

    private static void HandleRequest(
        ConcurrentDictionary<string, EndpointHandler> endpoints,
        HttpListenerContext context)
    {
        var endpointPath = context.Request.Url?.AbsolutePath;
        if (endpointPath == "/")
            ReturnEndpointsList(endpoints, context);
        else
            HandleEndpointRequest(endpoints, endpointPath?.TrimStart('/'), context);
    }

    private static void HandleEndpointRequest(
        ConcurrentDictionary<string, EndpointHandler> endpoints,
        string endpointPath, HttpListenerContext context)
    {
        if (endpoints.TryGetValue(endpointPath, out var endpoint))
            InvokeEndpoint(endpoint, context);
        else
            RespondNotFound(endpointPath, context);
    }

    private static void InvokeEndpoint(EndpointHandler endpointHandler, HttpListenerContext context)
    {
        endpointHandler.Invoke(context);
    }

    private static void RespondNotFound(string endpointPath, HttpListenerContext context)
    {
        context.Response.StatusCode = (int)HttpStatusCode.NotFound;
        context.Response.StatusDescription = "Not found";
        ResponseHelper.WriteObject(context, new TestingServerError($"Endpoint '{endpointPath}' is not registered."));
    }

    private static void ReturnEndpointsList(ConcurrentDictionary<string, EndpointHandler> endpoints,
        HttpListenerContext context)
    {
        context.Response.StatusCode = (int)HttpStatusCode.OK;
        ResponseHelper.WriteObject(context, endpoints.Keys.ToArray());
    }

    public void Stop()
    {
        _cancellationTokenSource.Cancel();
    }
}