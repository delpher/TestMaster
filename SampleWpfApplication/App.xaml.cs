﻿using System;
using System.Windows;
using System.Windows.Navigation;
using SampleWpfApplication.Pages;
using SampleWpfApplication.TestEndpoints;
using TestAssist;

namespace SampleWpfApplication;

public partial class App
{
    protected override void OnStartup(StartupEventArgs e)
    {
        TestAssistServer.StartServer(8080);
        TestsEndpoints.Register();
        
        TestAssistServer.Register("Index", () => 
            Dispatcher.Invoke(
                () => ((NavigationWindow)MainWindow).Navigate(new MainPage())
            )
        );
        
        base.OnStartup(e);
    }

    protected override void OnExit(ExitEventArgs e)
    {
        base.OnExit(e);
        TestAssistServer.StopServer();
    }
}