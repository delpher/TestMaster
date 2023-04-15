using System.Net;
using System.Threading;

namespace SampleWpfApplication;

public static class TestingEndpointServer
{
    private static readonly Thread ServerThread;

    public static void Start(CancellationToken cancellationToken)
    {
        ServerThread.Start(cancellationToken);
    }

    static TestingEndpointServer()
    {
        ServerThread = new Thread(RunHttpServer);
    }

    private static void RunHttpServer(object obj)
    {
        var ct = (CancellationToken)obj;
        var server = new HttpListener();
        server.Prefixes.Add("http://localhost:8080/");

        ct.Register(() => server.Stop());
            
        server.Start();

        while (!ct.IsCancellationRequested)
        {
            var context = server.GetContext();
            ThreadPool.QueueUserWorkItem(_ => HandleRequest(context));
        }
    }

    private static void HandleRequest(HttpListenerContext context)
    {
        var buffer = "{\"test\":\"test_value\"}"u8.ToArray();
        context.Response.ContentType = "application/json";
        context.Response.ContentLength64 = buffer.Length;
        context.Response.OutputStream.Write(buffer);
        context.Response.OutputStream.Flush();
    }
}