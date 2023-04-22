using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;

namespace SampleWpfApplication;

public static class UiTestingHelper
{
    public static void SetTextBoxValue(this TextBox textBox, string value)
    {
        if (!textBox.Dispatcher.CheckAccess())
        {
            textBox.Dispatcher.Invoke(() => SetTextBoxValue(textBox, value));
            return;
        }

        textBox.Text = value;
        BindingOperations.GetBindingExpression(textBox, TextBox.TextProperty)?.UpdateSource();
        textBox.RaiseEvent(new RoutedEventArgs(UIElement.LostFocusEvent));
    }
    
    public static string GetTextBlockText(this TextBlock textBlock)
    {
        if (!textBlock.Dispatcher.CheckAccess())
            return textBlock.Dispatcher.Invoke(() => GetTextBlockText(textBlock));
        
        textBlock.Dispatcher.VerifyAccess();
        return textBlock!.Text;
    }
}