
# urllib
from urllib.error import HTTPError

# thread
import threading


class MailSender():

    def __init__(self, msg=None) -> None:
        self.msg = msg

    def send(self):
      if self.msg is not None:
          # Send the mail asynchronous
          thread = threading.Thread(target=self._send_mail, args=(self.msg,))
          thread.start()
    
    def _send_mail(self, msg):
      try:
          msg.send(fail_silently=False)
          print("Correo enviado correctamente")
      except Exception as error:
          print(error)
