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
        try
        {
            element.UserDetailsExample.Dispatcher.VerifyAccess();
            element.UserDetailsExample.DoClick();
            return true;
        }
        catch (InvalidOperationException)
        {
            return element.UserDetailsExample.Dispatcher.Invoke(OpenUserDetailsExample);
        }
    }

    protected override void RemoveEndpoints()
    {
        TestAssistServer.Remove("Index/UserDetailsExample");
    }
}