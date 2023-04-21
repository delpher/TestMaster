using System.Net;

namespace TestAssist;

public class ParameterlessEndpointHandler : EndpointHandler
{
    private readonly Func<object> _callback;

    public ParameterlessEndpointHandler(string endpointPath, Func<object> callback) : base(endpointPath)
    {
        _callback = callback;
    }
    
    protected override object InvokeImplementation(HttpListenerContext context)
    {
        return _callback();
    }
}