using System.Windows;

namespace SampleWpfApplication.TestAssist.Wpf;

public abstract class FrameworkElementTestAdapter<TElement> where TElement: FrameworkElement
{
    
    public void Adapt(TElement element)
    {
        element.Loaded += OnLoaded;
    }

    protected virtual void OnLoaded(object sender, RoutedEventArgs routedEventArgs)
    {
        RegisterEndpoints((TElement)sender);
    }

    protected abstract void RegisterEndpoints(TElement element);
}