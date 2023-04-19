using System;
using TestAssist.Backend;

namespace SampleWpfApplication;

public partial class MainWindow
{
    public MainWindow()
    {
        DataContext = new MainWindowViewModel();
        InitializeComponent();

        TestAssistServer.Register<string>("SetFirstName", SetFirstName);
        TestAssistServer.Register<string>("SetLastName", SetLastName);
        TestAssistServer.Register<string>("SetAddress", SetAddress);
        TestAssistServer.Register("GetFullName", GetFullName);
    }

    private object SetAddress(string arg)
    {
        throw new NotImplementedException();
    }

    private object SetFirstName(string value)
    {
        return FirstNameField.SetValue(value);
    }
    
    private object SetLastName(string value)
    {
        return LastNameField.SetValue(value);
    }

    private string GetFullName()
    {
        return FullNameDisplay.GetText();
    }
}