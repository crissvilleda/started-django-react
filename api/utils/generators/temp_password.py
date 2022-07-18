import string
import random

## characters to generate password from
characters = list(string.ascii_letters + string.digits + "!@#$%^&*()")


def generate_temporary_password():
    ## length of password, default 8
    length = 8

    ## shuffling the characters
    random.shuffle(characters)
    
    ## picking random characters from the list
    password = []
    for i in range(length):
      password.append(random.choice(characters))

    ## shuffling the resultant password
    random.shuffle(password)

    ## converting the list to string and return
    return "".join(password)
