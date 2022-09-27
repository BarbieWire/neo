from django.shortcuts import render, redirect
from django.views import View
from .forms import ContactUsForm

from .models import ContactUsModel, Vacancy


class Main(View):
    def get(self, request, *args, **kwargs):
        return render(request, template_name='main/index.html')


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
