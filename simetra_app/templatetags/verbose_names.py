from django import template
from django.utils.html import format_html

register = template.Library()


@register.simple_tag
def get_verbose_field_name(instance, field_name):
    return instance._meta.get_field(field_name).verbose_name


@register.simple_tag
def get_city_option_text(city_form, field_name):
    return format_html("{}: {}", get_verbose_field_name(
        city_form.instance, field_name), city_form[field_name])
