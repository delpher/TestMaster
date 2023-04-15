namespace TestingEndpointServer;

internal class TestingEndpointServerStartupArguments
{
    public CancellationToken CancellationToken { get; }

    public int PortNumber { get; set; }

    public TestingEndpointServerStartupArguments(int portNumber, CancellationToken cancellationToken)
    {
        CancellationToken = cancellationToken;
        PortNumber = portNumber;
    }
}