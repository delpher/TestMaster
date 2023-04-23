using System.Net;
using Microsoft.AspNetCore.Http;

namespace TestAssist;

public class ParameterlessEndpointHandler : EndpointHandler
{
    private readonly Func<Task<object>> _callback;

    public ParameterlessEndpointHandler(string endpointPath, Func<Task<object>> callback) : base(endpointPath)
    {
        _callback = callback;
    }
    
    protected override async Task<object> InvokeImplementation(HttpContext context)
    {
        return await _callback();
    }
}