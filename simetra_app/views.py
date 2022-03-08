from django.shortcuts import render


def main_page(request):
    return render(request, 'simetra_app/main.html')


def methodology_page(request):
    return render(request, 'simetra_app/methodology.html')
