using System.Diagnostics;
using System.Net;

namespace TestAssist.HttpServer;

public abstract class HttpListenerServer : IDisposable
{
    private readonly Thread _listenerThread;
    private readonly CancellationTokenSource _cancellationTokenSource;

    protected HttpListenerServer()
    {
        _cancellationTokenSource = new CancellationTokenSource();
        _listenerThread = new Thread(RunHttpServer);
    }

    public void Start(int port)
    {
        var serverStartupArguments = new ServerStartupArguments(port);
        serverStartupArguments.SetCancellationToken(_cancellationTokenSource.Token);
        _listenerThread.Start(serverStartupArguments);
    }

    private void RunHttpServer(object obj)
    {
        var serverStartupArguments = (ServerStartupArguments)obj;
        var cancellationToken = serverStartupArguments.CancellationToken;
        var httpListener = new HttpListener();

        httpListener.Prefixes.Add($"http://localhost:{serverStartupArguments.Port}/");
        httpListener.Start();

        cancellationToken.Register(() => httpListener.Close());

        while (!cancellationToken.IsCancellationRequested && httpListener.IsListening)
        {
            try
            {
                var asyncResult = httpListener.BeginGetContext(OnContextReceived, httpListener);
                WaitHandle.WaitAny(new[] { cancellationToken.WaitHandle, asyncResult.AsyncWaitHandle });
            }
            catch (HttpListenerException ex)
            {
                if (ex.ErrorCode != 995)
                    throw;
            }
        }
    }

    private void OnContextReceived(IAsyncResult asyncResult)
    {
        try
        {
            var httpListener = (HttpListener)asyncResult.AsyncState;
            Debug.Assert(httpListener != null, nameof(httpListener) + " != null");
            HandleRequest(httpListener.EndGetContext(asyncResult));
        }
        catch (HttpListenerException ex)
        {
            if (ex.ErrorCode != 995)
                throw;
        }
    }

    protected abstract void HandleRequest(HttpListenerContext context);

    public void Stop()
    {
        _cancellationTokenSource.Cancel();
        _listenerThread.Join();
    }

    public void Dispose()
    {
        _cancellationTokenSource?.Dispose();
    }
}