using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;

namespace SampleWpfApplication.TestAssist.Wpf;

public abstract class PageTestAdapter<T> : FrameworkElementTestAdapter<T> where T: Page
{
    protected override void OnLoaded(object sender, RoutedEventArgs routedEventArgs)
    {
        base.OnLoaded(sender, routedEventArgs);
        ((Page)sender).NavigationService!.Navigating += OnNavigating;
    }

    private void OnNavigating(object sender, NavigatingCancelEventArgs e)
    {
        RemoveEndpoints();
    }
    
    protected abstract void RemoveEndpoints();
}