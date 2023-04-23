using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace TestAssist.HttpServer;

public abstract class HttpServer : IDisposable
{
    private WebApplication _webApplication;
    
    public void Start(int port)
    {
        var builder = WebApplication.CreateBuilder();
        
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
            });
        });

        builder.WebHost.UseUrls($"http://localhost:{port}");
        
        _webApplication = builder.Build();

        _webApplication.UseCors();

        _webApplication.Use(async (context, next) =>
        {
            await next();
            if (HttpMethods.IsOptions(context.Request.Method))
                context.Response.StatusCode = (int)HttpStatusCode.NoContent;
            else
                await HandleRequest(context);
        });
        
        _webApplication.RunAsync();
    }

    protected abstract Task HandleRequest(HttpContext context);

    public void Stop()
    {
        _webApplication.StopAsync().Wait();
    }

    public void Dispose()
    {
        ((IDisposable)_webApplication).Dispose();
        GC.SuppressFinalize(this);
    }
}