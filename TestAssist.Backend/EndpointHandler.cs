using System.Net;
using TestAssist.Backend.HttpServer;

namespace TestAssist.Backend;

public abstract class EndpointHandler
{
    private readonly string _endpointPath;
    
    protected EndpointHandler(string endpointPath)
    {
        _endpointPath = endpointPath;
    }
    
    public void Invoke(HttpListenerContext context)
    {
        try
        {
            context.Response.StatusCode = (int)HttpStatusCode.OK;
            var result = InvokeCallback(context);
            ResponseHelper.WriteObject(context, result);
        }
        catch (Exception exception)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            ResponseHelper.WriteObject(context, MakeError(exception));
        }
    }

    protected abstract object InvokeCallback(HttpListenerContext context);

    private TestingServerError MakeError(Exception exception)
    {
        return new TestingServerError($"Exception was thrown invoking '{_endpointPath}'")
        {
            Exception = exception.ToString()
        };
    }
}