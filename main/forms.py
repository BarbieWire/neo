from django.forms import ModelForm
from .models import ContactUsModel


class ContactUsForm(ModelForm):
    # for some case
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = ContactUsModel
        fields = ["name", "email", "message"]
