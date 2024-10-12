from django.urls import path # type: ignore
from . import views

urlpatterns = [
    path('', views.home),
    path('about/', views.about)
]
from flask import app, render_template
@app.route('/home')
def homepage():
    return render_template('index.html')

from flask_sqlalchemy import SQLAlchemy  # type: ignore

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
class User (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.column(db.String(20), unique=True, nullable=False)

    def __repr__(self):
        return f"User('{self.username}')"