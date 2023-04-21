using System.Collections.Concurrent;
using System.Net;
using TestAssist.HttpServer;

namespace TestAssist;

public class TestEndpointsServer : HttpListenerServer
{
    private readonly ConcurrentDictionary<string, EndpointHandler> _endpoints;

    public TestEndpointsServer()
    {
        _endpoints = new ConcurrentDictionary<string, EndpointHandler>();
        Register("", EnumerateRegisteredEndpoints);
    }
    
    public bool Register(string endpointPath, Func<object> handler)
    {
        return RegisterEndpointHandler(endpointPath, new ParameterlessEndpointHandler(endpointPath, handler));
    }

    public bool Register<TParameters>(string endpointPath, Func<TParameters, object> handler)
    {
        return RegisterEndpointHandler(endpointPath, new ParametrizedEndpointHandler<TParameters>(endpointPath, handler));
    }

    private bool RegisterEndpointHandler(string endpointPath, EndpointHandler endpointHandler)
    {
        if (_endpoints.ContainsKey(endpointPath)) _endpoints.Remove(endpointPath, out _);
        return _endpoints.TryAdd(endpointPath, endpointHandler);
    }

    protected override void HandleRequest(HttpListenerContext context)
    {
        CorsSupport.AllowCors(context.Response);
        CacheControl.DisableCache(context.Response);
        if (context.Request.HttpMethod == "OPTIONS")
            context.Response.Close();
        else
        {
            var endpointPath = context.Request.Url?.AbsolutePath;
            HandleEndpointRequest(_endpoints, endpointPath?.TrimStart('/'), context);
        }
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

    public bool Remove(string endpointPath)
    {
        return _endpoints.TryRemove(endpointPath, out _);
    }

    private object EnumerateRegisteredEndpoints()
    {
        return _endpoints.Keys
            .Where(endpointPath => endpointPath != "");
    }
}