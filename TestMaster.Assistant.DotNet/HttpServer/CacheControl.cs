using System.Net;

namespace TestMaster.Assistant.DotNet.HttpServer;

public static class CacheControl
{
    public static void DisableCache(HttpListenerResponse response)
    {
        response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.AppendHeader("Pragma", "no-cache");
        response.AppendHeader("Expires", "0");
    }
}