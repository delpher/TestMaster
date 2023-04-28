namespace TestMaster.Assistant.DotNet;

public static class TestAssistServer
{
    private static TestEndpointsServer _instance;

    public static void StartServer(int port)
    {
        _instance = new TestEndpointsServer();
        _instance.Start(port);
    }

    public static void StopServer()
    {
        _instance.Stop();
    }

    public static void Register(string endpointPath, Func<object> handler)
    {
        _instance.Register(endpointPath, handler);
    }

    public static void Register<TParameters>(string endpointPath, Func<TParameters, object> handler)
    {
        _instance.Register(endpointPath, handler);
    }

    public static void Remove(string endpointPath)
    {
        _instance.Remove(endpointPath);
    }
}