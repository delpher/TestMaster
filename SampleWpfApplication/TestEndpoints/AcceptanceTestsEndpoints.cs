using System;
using TestAssist;

namespace SampleWpfApplication.TestEndpoints;

public class AcceptanceTestsEndpoints
{
    public static void Register()
    {
        TestAssistServer.Register("ReturnFailure", () => false);
        TestAssistServer.Register("ThrowException", () => throw new InvalidOperationException("Test exception message"));
    }
}