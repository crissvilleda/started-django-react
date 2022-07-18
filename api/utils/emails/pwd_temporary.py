# django
from django.core.mail import  EmailMessage, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string

# Sender
from .sender import MailSender


def send_mail_temporary_password(user, temp_pwd, email=None):
    """Method used to send temporary password. """

    if email is None:
        email = user.email

    url_login = f"{settings.URL_FRONTEND}/#/login"
    url_logo = f"{settings.URL_FRONTEND}/static/img/logo.png"

    subject = f'Hola! {user.first_name} bienvenid@ a'
    from_email = ' <noreply@nose.org>'
    content = render_to_string(
        'emails/users/temp_pwd.html',
        {'link': url_login, 'user': user, 'temp_pwd':temp_pwd, 'url_logo': url_logo}
    )
    msg = EmailMultiAlternatives(
        subject, content, from_email, [email])
    msg.attach_alternative(content, "text/html")

    # Send the mail asynchronous
    sender = MailSender(msg)
    sender.send()