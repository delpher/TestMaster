using System.Net;
using System.Text.Json;

namespace TestAssist;

public class ParametrizedEndpointHandler<TParameters> : EndpointHandler
{
    private readonly Func<TParameters, object> _callback;

    public ParametrizedEndpointHandler(string endpointPath, Func<TParameters, object> callback) 
        : base(endpointPath)
    {
        _callback = callback;
    }

    protected override object InvokeImplementation(HttpListenerContext context)
    {
        var parameters = JsonSerializer.Deserialize(context.Request.InputStream, typeof(TParameters));
        return _callback((TParameters)parameters);
    }
}