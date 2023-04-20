namespace TestAssist;

public class TestingServerError
{
    public string Message { get; }
    public string Exception { get; init; }

    public TestingServerError(string message)
    {
        Message = message;
    }
}