namespace SampleWpfApplication.Pages;

public partial class UserDetails
{
    public UserDetails()
    {
        InitializeComponent();
        DataContext = new UserDetailsViewModel();

        var testAdapter = new UserDetailsTestAdapter();
        testAdapter.Adapt(this);
    }
}