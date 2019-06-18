import six
from pynamodb.attributes import UnicodeAttribute

class MinLength(UnicodeAttribute):
    """
    An configurable min length attribute
    """
    # Override https://github.com/pynamodb/PynamoDB/blob/master/pynamodb/attributes.py#L30
    def __init__(self,
                 hash_key=False,
                 range_key=False,
                 null=None,
                 default=None,
                 default_for_new=None,
                 attr_name=None,
                 min_length=None,
                 field=''
                 ):
        self.default = default
        self.default_for_new = default_for_new
        if null is not None:
            self.null = null
        self.is_hash_key = hash_key
        self.is_range_key = range_key
        self.attr_path = [attr_name]
        self.min_length = min_length
        self.field = field

    def serialize(self, value):
        if len(value) <= self.min_length:
            raise Exception(f"{self.field} must be a minimum of {self.min_length} characters long") 
        elif value is None or not len(value):
            return None
        elif isinstance(value, six.text_type):
            return value
        else:
            return six.u(value)