# django
from django.core.mail import  EmailMessage, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string

# Sender
from .sender import MailSender


def send_mail_admins_new_user(user, emails=None):
    """Method used to send alert to super users for new account. """

    link = f"{settings.URL_FRONTEND}/#/user/{user.id}/update"
    url_logo = f"{settings.URL_FRONTEND}/static/img/logo.png"
    
    subject = f"Nueva cuenta en"
    from_email = ' <noreply@nose.org>'
    content = render_to_string(
        'emails/users/new_user.html', 
        {'user': user, "link":link, 'url_logo': url_logo }
    )
    msg = EmailMultiAlternatives(
        subject, content, from_email, emails)
    msg.attach_alternative(content, "text/html")

    # Send the mail asynchronous
    sender = MailSender(msg)
    sender.send()