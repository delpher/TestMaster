using System.Windows;
using SampleWpfApplication.TestEndpoints;
using TestAssist;

namespace SampleWpfApplication;

public partial class App
{
    protected override void OnStartup(StartupEventArgs e)
    {
        TestAssistServer.StartServer(8080);
        AcceptanceTestsEndpoints.Register();
        base.OnStartup(e);
    }

    protected override void OnExit(ExitEventArgs e)
    {
        base.OnExit(e);
        TestAssistServer.StopServer();
    }
}