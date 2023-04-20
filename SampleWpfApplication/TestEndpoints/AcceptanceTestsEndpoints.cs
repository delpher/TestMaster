using TestAssist;

namespace SampleWpfApplication.TestEndpoints;

public class AcceptanceTestsEndpoints
{
    public static void Register()
    {
        TestAssistServer.Register("ReturnFailure", () => false);
    }
}