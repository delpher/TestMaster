using System.Net;

namespace TestAssist.Backend.HttpServer;

public static class CorsSupport
{
    public static void AllowCors(HttpListenerContext context) 
    {
        context.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
        context.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST");
        context.Response.AddHeader("Access-Control-Max-Age", "1728000");
        context.Response.AddHeader("Access-Control-Allow-Origin", "*");
    }
}