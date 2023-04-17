using System.Net;

namespace TestAssist.Backend.HttpServer;

public abstract class HttpListenerServer
{
    private readonly Thread _listenerThread;
    private readonly CancellationTokenSource _cancellationTokenSource;

    protected HttpListenerServer()
    {
        _cancellationTokenSource = new CancellationTokenSource();
        _listenerThread = new Thread(RunHttpServer);
    }

    protected void StartListenerThread(ServerStartupArguments arguments)
    {
        arguments.SetCancellationToken(_cancellationTokenSource.Token);
        _listenerThread.Start(arguments);
    }
    
    private void RunHttpServer(object obj)
    {
        var args = (ServerStartupArguments)obj;
        var cancellationToken = args.CancellationToken;
        var server = new HttpListener();
        server.Prefixes.Add($"http://localhost:{args.Port}/");

        server.Start();

        cancellationToken.Register(() => server.Stop());

        while (!cancellationToken.IsCancellationRequested)
        {
            if (!cancellationToken.IsCancellationRequested)
            {
                var context = server.GetContext();
                ThreadPool.QueueUserWorkItem(_ => HandleRequest(args, context));
            }
        }
    }

    protected abstract void HandleRequest(ServerStartupArguments args, HttpListenerContext context);

    public void Stop()
    {
        _cancellationTokenSource.Cancel();
    }
}