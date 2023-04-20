namespace TestAssist.Backend.HttpServer;

public class ServerStartupArguments
{
    public int Port { get; }
    public CancellationToken CancellationToken { get; private set; }

    public ServerStartupArguments(int port)
    {
        Port = port;
    }

    public void SetCancellationToken(CancellationToken cancellationToken)
    {
        CancellationToken = cancellationToken;
    }
}