namespace TestAssist.Backend;

public static class TestAssistServer
{
    private static TestEndpointsServer _instance;

    public static void StartServer(int port)
    {
        _instance = new TestEndpointsServer(port);
        _instance.Start();
    }

    public static void StopServer()
    {
        _instance.Stop();
    }

    public static bool Register(string endpointPath, Func<object> handler)
    {
        return _instance.Register(endpointPath, handler);
    }

    public static bool Register<TParameters>(string endpointPath, Func<TParameters, object> handler)
    {
        return _instance.Register(endpointPath, handler);
    }
}