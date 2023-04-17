using System.Collections.Concurrent;
using TestAssist.Backend.HttpServer;

namespace TestAssist.Backend;

internal class TestingAssistServerStartupArguments : ServerStartupArguments
{
    public ConcurrentDictionary<string, EndpointHandler> Endpoints { get; }

    public TestingAssistServerStartupArguments(int port, ConcurrentDictionary<string, EndpointHandler> endpoints) : base(port)
    {
        Endpoints = endpoints;
    }
}