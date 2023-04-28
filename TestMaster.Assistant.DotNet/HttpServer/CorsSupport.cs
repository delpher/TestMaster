using System.Net;

namespace TestMaster.Assistant.DotNet.HttpServer;

public static class CorsSupport
{
    public static void AllowCors(HttpListenerResponse response) 
    {
        response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
        response.AddHeader("Access-Control-Allow-Methods", "GET, POST");
        response.AddHeader("Access-Control-Max-Age", "1728000");
        response.AddHeader("Access-Control-Allow-Origin", "*");
    }
}