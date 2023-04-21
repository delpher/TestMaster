using SampleWpfApplication.TestAssist.Wpf;
using TestAssist;

namespace SampleWpfApplication.Pages;

public class UserDetailsTestAdapter : PageTestAdapter<UserDetails>
{
    protected override void RegisterEndpoints(UserDetails element)
    {
        TestAssistServer.Register<string>("UserDetails/SetFirstName", value => SetFirstName(element, value));
        TestAssistServer.Register<string>("UserDetails/SetLastName", value => SetLastName(element, value));
        TestAssistServer.Register("UserDetails/GetFullName", () => GetFullName(element));
    }

    protected override void RemoveEndpoints()
    {
        TestAssistServer.Remove("UserDetails/SetFirstName");
        TestAssistServer.Remove("UserDetails/SetLastName");
        TestAssistServer.Remove("UserDetails/GetFullName");
    }

    private object SetFirstName(UserDetails userDetails, string value)
    {
        userDetails.FirstNameField.SetValue(value);
        return userDetails.Dispatcher.Invoke(() => ((UserDetailsViewModel)userDetails.DataContext).FirstName == value);
    }

    private object SetLastName(UserDetails userDetails, string value)
    {
        userDetails.LastNameField.SetValue(value);
        return userDetails.Dispatcher.Invoke(() => ((UserDetailsViewModel)userDetails.DataContext).LastName == value);
    }

    private string GetFullName(UserDetails userDetails)
    {
        return userDetails.FullNameDisplay.GetText();
    }
}