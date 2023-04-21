using System.Net;
using TestAssist.HttpServer;

namespace TestAssist;

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
            var result = InvokeImplementation(context);
            context.Response.StatusCode = (int)HttpStatusCode.OK;
            ResponseHelper.WriteObject(context, result);
        }
        catch (Exception exception)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            ResponseHelper.WriteObject(context, MakeError(exception));
        }
    }

    protected abstract object InvokeImplementation(HttpListenerContext context);

    private TestingServerError MakeError(Exception exception)
    {
        return new TestingServerError($"Exception was thrown invoking '{_endpointPath}'")
        {
            Exception = exception.ToString()
        };
    }
}