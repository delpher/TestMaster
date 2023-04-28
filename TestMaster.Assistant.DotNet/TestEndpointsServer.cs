using System.Collections.Concurrent;
using System.Net;
using Microsoft.AspNetCore.Http;

namespace TestMaster.Assistant.DotNet;

public class TestEndpointsServer : HttpServer.HttpServer
{
    private readonly ConcurrentDictionary<string, EndpointHandler> _endpoints;

    public TestEndpointsServer()
    {
        _endpoints = new ConcurrentDictionary<string, EndpointHandler>();
        Register("", EnumerateRegisteredEndpoints);
    }
    
    public bool Register(string endpointPath, Func<object> handler)
    {
        return Register(endpointPath, () => Task.FromResult(handler()));
    }
    
    public bool Register(string endpointPath, Func<Task<object>> handler)
    {
        return RegisterEndpointHandler(endpointPath, new ParameterlessEndpointHandler(endpointPath, handler));
    }

    public bool Register<TParameters>(string endpointPath, Func<TParameters, object> handler)
    {
        return Register<TParameters>(endpointPath, parameters => Task.FromResult(handler(parameters)));
    }

    private bool Register<TParameters>(string endpointPath, Func<TParameters, Task<object>> handler)
    {
        return RegisterEndpointHandler(endpointPath, new ParametrizedEndpointHandler<TParameters>(endpointPath, handler));
    }

    private bool RegisterEndpointHandler(string endpointPath, EndpointHandler endpointHandler)
    {
        if (_endpoints.ContainsKey(endpointPath)) _endpoints.Remove(endpointPath, out _);
        return _endpoints.TryAdd(endpointPath, endpointHandler);
    }

    protected override async Task HandleRequest(HttpContext context)
    {
        var endpointPath = context.Request.Path.Value;
        await HandleEndpointRequest(_endpoints, endpointPath?.TrimStart('/'), context);
    }

    private static async Task HandleEndpointRequest(ConcurrentDictionary<string, EndpointHandler> endpoints,
        string endpointPath, HttpContext context)
    {
        if (endpoints.TryGetValue(endpointPath, out var endpoint)) 
            await InvokeEndpoint(endpoint, context);
        else
        {
            context.Response.StatusCode = (int)HttpStatusCode.NotFound;
            await context.Response.WriteAsJsonAsync(new TestingServerError($"Endpoint '{endpointPath}' is not registered."));
        }
    }

    private static async Task InvokeEndpoint(EndpointHandler endpointHandler, HttpContext context)
    {
        await endpointHandler.Invoke(context);
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