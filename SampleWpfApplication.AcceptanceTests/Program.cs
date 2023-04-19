using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions()
{
    OnPrepareResponse = context =>
    {
        context.Context.Response.Headers["Cache-Control"] = "no-cache, no-store";
        context.Context.Response.Headers["Pragma"] = "no-cache";
        context.Context.Response.Headers["Expires"] = "-1";
    }
});

app.Run();