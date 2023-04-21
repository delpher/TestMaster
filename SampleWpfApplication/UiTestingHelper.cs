using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;

namespace SampleWpfApplication;

public static class UiTestingHelper
{
    public static void SetValue(this TextBox textBox, string value)
    {
        try
        {
            textBox.Dispatcher.VerifyAccess();
            textBox.Text = value;
            BindingOperations.GetBindingExpression(textBox, TextBox.TextProperty)?.UpdateSource();
            textBox.RaiseEvent(new RoutedEventArgs(UIElement.LostFocusEvent));
        }
        catch
        {
            textBox.Dispatcher.Invoke(() => SetValue(textBox, value));
        }
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