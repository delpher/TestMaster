using System.Net;
using System.Text.Json;

namespace TestAssist.HttpServer;

internal static class ResponseHelper
{
    public static void WriteObject(HttpListenerContext context, object value)
    {
        context.Response.ContentType = "application/json";
        using var writer = new StreamWriter(context.Response.OutputStream);
        writer.Write(JsonSerializer.Serialize(value));
    }
}