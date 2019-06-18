import six
import re
from pynamodb.attributes import UnicodeAttribute

EMAIL_REGEX = re.compile(f"[^@]+@[^@]+\.[^@]+")

class EmailAttribute(UnicodeAttribute):
    """
    An email attribute
    """
    def serialize(self, value):
        # convert the value to binary and return it
        if not EMAIL_REGEX.match(value):
            raise Exception('Invalid email') 
        elif value is None or not len(value):
            return None
        elif isinstance(value, six.text_type):
            return value
        else:
            return six.u(value)