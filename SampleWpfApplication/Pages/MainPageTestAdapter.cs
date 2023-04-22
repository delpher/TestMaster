using System;
using SampleWpfApplication.TestAssist.Wpf;
using TestAssist;

namespace SampleWpfApplication.Pages;

public class MainPageTestAdapter : PageTestAdapter<MainPage>
{
    protected override void RegisterEndpoints(MainPage element)
    {
        TestAssistServer.Register("Index/UserDetailsExample", () => OpenUserDetailsExample(element));
    }

    private object OpenUserDetailsExample(MainPage element)
    {
        if (!element.Dispatcher.CheckAccess())
            return element.Dispatcher.Invoke(() => OpenUserDetailsExample(element));
        
        element.UserDetailsExample.DoClick();
        return true;
    }

    protected override void RemoveEndpoints()
    {
        TestAssistServer.Remove("Index/UserDetailsExample");
    }
}