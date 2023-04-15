using System.Threading;
using System.Windows;

namespace SampleWpfApplication
{
    public partial class App
    {
        private readonly CancellationTokenSource _cts;

        public App()
        {
            _cts = new CancellationTokenSource();
        }
        
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            TestingEndpointServer.TestingServer.Start(8080, _cts.Token);
        }

        protected override void OnExit(ExitEventArgs e)
        {
            _cts.Cancel();
            base.OnExit(e);
        }
    }
}