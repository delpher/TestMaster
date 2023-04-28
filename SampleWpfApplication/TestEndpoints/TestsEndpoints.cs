using System;
using TestMaster.Assistant.DotNet;

namespace SampleWpfApplication.TestEndpoints;

public class TestsEndpoints
{
    public static void Register()
    {
        TestAssistServer.Register("ReturnFailure", () => false);
        TestAssistServer.Register("ReturnSuccess", () => true);
        TestAssistServer.Register("ThrowException", () => throw new InvalidOperationException("Test exception message"));
    }
}