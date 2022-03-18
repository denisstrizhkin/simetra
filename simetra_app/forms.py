from django import forms

from .models import Boss, Employee, LocationOfCity, City


class LocationOfCityForm(forms.ModelForm):
    class Meta:
        model = LocationOfCity
        fields = '__all__'


class BossForm(forms.ModelForm):
    class Meta:
        model = Boss
        fields = '__all__'


class CityForm(forms.ModelForm):
    class Meta:
        model = City
        fields = '__all__'


class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = '__all__'
