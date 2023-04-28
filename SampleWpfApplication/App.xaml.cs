using System.Windows;
using System.Windows.Navigation;
using SampleWpfApplication.Pages;
using SampleWpfApplication.TestEndpoints;
using TestMaster.Assistant.DotNet;

namespace SampleWpfApplication;

public partial class App
{
    private NavigationWindow Window => (NavigationWindow)MainWindow;
    protected override void OnStartup(StartupEventArgs e)
    {
        TestAssistServer.StartServer(8080);
        
        TestsEndpoints.Register();
        TestAssistServer.Register("Index", OpenMainPage);
        
        base.OnStartup(e);
    }

    private object OpenMainPage()
    {
        return Dispatcher.CheckAccess() 
            ? Window.Navigate(new MainPage()) 
            : Dispatcher.Invoke(OpenMainPage);
    }

    protected override void OnExit(ExitEventArgs e)
    {
        base.OnExit(e);
        TestAssistServer.StopServer();
    }
}