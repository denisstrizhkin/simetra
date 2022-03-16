from django.contrib import admin

from .models import Boss, Employee, City


class CityAdmin(admin.ModelAdmin):
    pass


admin.site.register(Boss)
admin.site.register(Employee)
admin.site.register(City, CityAdmin)
