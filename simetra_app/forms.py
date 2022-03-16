from django import forms

from .models import LocationOfCity, City


class LocationOfCityForm(forms.ModelForm):
    class Meta:
        model = LocationOfCity
        fields = '__all__'


class CityForm(forms.ModelForm):
    class Meta:
        model = City

        fields = '__all__'
