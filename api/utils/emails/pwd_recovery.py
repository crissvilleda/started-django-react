# django
from django.core.mail import  EmailMessage, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string

# mail sender
from .sender import MailSender


def send_mail_password_recovery(user,token):
    """Method used for token shipping for password recovery. """
   

    pwd_recovery_url = f"{settings.URL_FRONTEND}/#/password-recovery/{user.username}/{token}"
    url_logo = f"{settings.URL_FRONTEND}/static/img/logo.png"

    subject = f'Hola! {user.first_name} has solicitado cambio de contraseña'
    from_email = 'Ise <noreply@fundacionise.org>'
    content = render_to_string(
        'emails/users/reset_pwd.html',
        {'link': pwd_recovery_url, 'user': user, 'url_logo': url_logo}
    )
    msg = EmailMultiAlternatives(
        subject, content, from_email, [user.email])
    msg.attach_alternative(content, "text/html")

    sender = MailSender(msg)
    sender.send()