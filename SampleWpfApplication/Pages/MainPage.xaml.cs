namespace SampleWpfApplication.Pages;

public partial class MainPage
{
    public MainPage()
    {
        InitializeComponent();
        var testAdapter = new MainPageTestAdapter();
        testAdapter.Adapt(this);
    }
}