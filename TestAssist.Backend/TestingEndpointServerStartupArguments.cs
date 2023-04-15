using System.Collections.Concurrent;

namespace TestAssist.Backend;

internal class TestingEndpointServerStartupArguments
{
    public ConcurrentDictionary<string, EndpointHandler> Endpoints { get; }
    public CancellationToken CancellationToken { get; }
    public int PortNumber { get; }

    public TestingEndpointServerStartupArguments(int portNumber,
        ConcurrentDictionary<string, EndpointHandler> endpoints, CancellationToken cancellationToken)
    {
        Endpoints = endpoints;
        CancellationToken = cancellationToken;
        PortNumber = portNumber;
    }
}