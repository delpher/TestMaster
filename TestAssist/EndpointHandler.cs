using System.Net;
using Microsoft.AspNetCore.Http;

namespace TestAssist;

public abstract class EndpointHandler
{
    private readonly string _endpointPath;
    
    protected EndpointHandler(string endpointPath)
    {
        _endpointPath = endpointPath;
    }
    
    public async Task Invoke(HttpContext context)
    {
        try
        {
            var result = await InvokeImplementation(context);
            context.Response.StatusCode = (int)HttpStatusCode.OK;
            await context.Response.WriteAsJsonAsync(result);
        }
        catch (Exception exception)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await context.Response.WriteAsJsonAsync(MakeError(exception));
        }
    }

    protected abstract Task<object> InvokeImplementation(HttpContext context);

    private TestingServerError MakeError(Exception exception)
    {
        return new TestingServerError($"Exception was thrown invoking '{_endpointPath}'")
        {
            Exception = exception.ToString()
        };
    }
}