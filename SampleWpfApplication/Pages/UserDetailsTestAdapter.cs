using TestMaster.Assistant.DotNet;
using TestMaster.Assistant.DotNet.Wpf;

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
        userDetails.FirstNameField.SetTextBoxValue(value);
        return GetDataContext(userDetails).FirstName == value;
    }

    private object SetLastName(UserDetails userDetails, string value)
    {
        userDetails.LastNameField.SetTextBoxValue(value);
        return GetDataContext(userDetails).LastName == value;
    }

    private UserDetailsViewModel GetDataContext(UserDetails userDetails)
    {
        if (userDetails.Dispatcher.CheckAccess())
            return (UserDetailsViewModel)userDetails.DataContext;
        return userDetails.Dispatcher.Invoke(() => GetDataContext(userDetails));
    }

    private string GetFullName(UserDetails userDetails)
    {
        return userDetails.FullNameDisplay.GetTextBlockText();
    }
}