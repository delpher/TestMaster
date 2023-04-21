using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace SampleWpfApplication.Pages;

public class UserDetailsViewModel : INotifyPropertyChanged
{
    private string _firstName;
    private string _lastName;
    private string _fullName;

    public string FirstName
    {
        get => _firstName;
        set
        {
            SetField(ref _firstName, value);
            UpdateFullName();
        }
    }

    public string LastName
    {
        get => _lastName;
        set
        {
            SetField(ref _lastName, value);
            UpdateFullName();
        }
    }

    public string FullName
    {
        get => _fullName;
        private set => SetField(ref _fullName, value);
    }

    private void UpdateFullName()
    {
        FullName = $"{FirstName} {LastName}";
    }

    public event PropertyChangedEventHandler PropertyChanged;

    private void SetField<T>(ref T field, T value, [CallerMemberName] string propertyName = null)
    {
        if (EqualityComparer<T>.Default.Equals(field, value)) return;
        field = value;
        OnPropertyChanged(propertyName);
    }

    protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}