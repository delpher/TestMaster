using System.Windows;
using System.Windows.Controls;

namespace SampleWpfApplication;

public static class UiTestingHelper
{
    public static bool SetTextBoxValue(this FrameworkElement view, string elementName, string value)
    {
        try
        {
            view.Dispatcher.VerifyAccess();
            return SetTextBoxValueUnsafe(elementName, value, view);
        }
        catch
        {
            return view.Dispatcher.Invoke(() => SetTextBoxValueUnsafe(elementName, value, view));
        }
    }

    private static bool SetTextBoxValueUnsafe(string elementName, string value, FrameworkElement view)
    {
        var field = (TextBox)view.FindName(elementName);
        field!.Text = value;
        field!.RaiseEvent(new RoutedEventArgs(UIElement.LostFocusEvent));
        return true;
    }

    public static string GetTextBlockValue(this FrameworkElement view, string elementName)
    {
        try
        {
            view.Dispatcher.VerifyAccess();
            return GetTextBlockValueUnsafe(view, elementName);
        }
        catch
        {
            return view.Dispatcher.Invoke(() => GetTextBlockValueUnsafe(view, elementName));
        }
    }

    private static string GetTextBlockValueUnsafe(FrameworkElement view, string elementName)
    {
        return ((TextBlock)view.FindName(elementName))!.Text;
    }
}