# django
from django.core.mail import  EmailMessage, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string

# mail sender
from .sender import MailSender


def send_mail_active_account(user):
    """Method used for token shipping for password recovery. """


    url_logo = f"{settings.URL_FRONTEND}/static/img/logo.png"
    
    subject = f'Hola! {user.first_name} tu cuenta ha sido activada.'
    from_email = ' <noreply@nose.org>'
    content = render_to_string(
        'emails/users/active_account.html',
        {'link': settings.URL_FRONTEND, 'user': user, 'url_logo': url_logo}
    )
    msg = EmailMultiAlternatives(
        subject, content, from_email, [user.email])
    msg.attach_alternative(content, "text/html")

    sender = MailSender(msg)
    sender.send()