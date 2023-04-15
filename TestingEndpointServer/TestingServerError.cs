namespace TestingEndpointServer;

public class TestingServerError
{
    public string Message { get; }

    public TestingServerError(string message)
    {
        Message = message;
    }
}