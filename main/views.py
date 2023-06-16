from django.shortcuts import render, redirect
from django.views import View
from .forms import ContactUsForm

from .models import ContactUsModel, Vacancy

from django.utils import translation


class Main(View):
    def get(self, request, *args, **kwargs):
        return render(request, template_name='main/Home.html')


class Contact(View):
    def get(self, request, *args, **kwargs):
        return render(request, template_name='main/ContactUs.html')

    def post(self, request, *args, **kwargs):
        form = ContactUsForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(ContactUsModel())

        return render(request, template_name="main/ContactUs.html")


class About(View):
    def get(self, request, *args, **kwargs):
        return render(request, template_name='main/AboutUs.html')


class Vacancies(View):
    def get(self, request, *args, **kwargs):
        queryset = Vacancy.objects.all()
        context = {"vacancies": queryset}
        return render(
            request,
            template_name='main/Vacancies.html',
            context=context
        )


def set_language(request):
    if request.method == 'POST':
        language = request.POST.get('language')

        if language:
            translation.activate(language)
            response = redirect(request.POST.get('next', 'home'))  # Redirect to the desired page
            response.set_cookie(
                'django_language',
                language,
                max_age=31536000,  # Set the cookie to expire after a year
            )
            return response
    return redirect('home')
