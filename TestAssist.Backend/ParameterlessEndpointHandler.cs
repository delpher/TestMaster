using System.Net;

namespace TestAssist.Backend;

public class ParameterlessEndpointHandler : EndpointHandler
{
    private readonly Func<object> _callback;
    public ParameterlessEndpointHandler(string endpointPath, Func<object> callback) : base(endpointPath)
    {
        _callback = callback;
    }
    
    protected override object InvokeCallback(HttpListenerContext context)
    {
        return _callback();
    }
}