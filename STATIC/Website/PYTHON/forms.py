from flask import app
from flask_wtf import FlaskForm # type: ignore
from wtforms import StringField, SubmitField # type: ignore
class RegistrationForm(FlaskForm):
    username = StringField('Username')
    submit = SubmitField('Sign Up')

from django import forms # type: ignore
class UserForm(forms.Form):
    username = forms.CharFIeld(label='Username', max_length=100)


