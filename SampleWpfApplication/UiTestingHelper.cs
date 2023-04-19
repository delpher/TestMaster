using System.Windows;
using System.Windows.Controls;
using System.Windows.Threading;

namespace SampleWpfApplication;

public static class UiTestingHelper
{
    public static bool SetValue(this TextBox textBox, string value)
    {
        try
        {
            textBox.Dispatcher.VerifyAccess();
            return SetTextBoxValueUnsafe(textBox, value);
        }
        catch
        {
            return textBox.Dispatcher.Invoke(() => SetTextBoxValueUnsafe(textBox, value));
        }
    }

    private static bool SetTextBoxValueUnsafe(TextBox textBox, string value)
    {
        textBox!.Text = value;
        textBox!.RaiseEvent(new RoutedEventArgs(UIElement.LostFocusEvent));
        return true;
    }

    public static string GetText(this TextBlock textBlock)
    {
        try
        {
            textBlock.Dispatcher.VerifyAccess();
            return GetTextBlockTextUnsafe(textBlock);
        }
        catch
        {
            return textBlock.Dispatcher.Invoke(() => GetTextBlockTextUnsafe(textBlock));
        }
    }

    private static string GetTextBlockTextUnsafe(TextBlock textBlock)
    {
        return textBlock!.Text;
    }
}