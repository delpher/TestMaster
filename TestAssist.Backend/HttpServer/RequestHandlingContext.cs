using System.Net;

namespace TestAssist.Backend.HttpServer;

internal class RequestHandlingContext
{
    public ServerStartupArguments ServerStartupArguments { get; set; }
    public HttpListenerContext Context { get; set; }
}