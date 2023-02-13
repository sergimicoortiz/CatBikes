import random
import string
import secrets

DEFAULT_CHAR_STRING = string.ascii_lowercase + string.digits


def generate_random_string(chars=DEFAULT_CHAR_STRING, size=6):

    return ''.join(random.choice(chars) for _ in range(size))


def generate_uuid():

    part1 = secrets.token_hex(4)
    part2 = secrets.token_hex(2)
    part3 = secrets.token_hex(2)
    part4 = secrets.token_hex(2)
    part5 = secrets.token_hex(6)

    return part1 + "-" + part2 + "-" + part3 + "-" + part4 + "-" + part5
