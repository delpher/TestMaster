namespace TestAssist.Backend;

public class TestingServerError
{
    public string Message { get; }
    public string Exception { get; set; }

    public TestingServerError(string message)
    {
        Message = message;
    }
}