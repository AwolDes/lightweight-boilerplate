from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, BooleanAttribute, ListAttribute
from models.attributes.email import EmailAttribute
from models.attributes.min_length import MinLength
import os

class UserModel(Model):
    """
    User model
    """
    class Meta:
        table_name = os.environ['USER_TABLE']
        region = os.environ['REGION']
    uuid = UnicodeAttribute(hash_key=True)
    email = EmailAttribute(null=False)
    firstName = UnicodeAttribute(null=False)
    lastName = UnicodeAttribute(null=False)
    password = MinLength(null=False, min_length=9, field='password')
    accessToken = UnicodeAttribute(null=True)
    refreshToken = UnicodeAttribute(null=True)
    verified = BooleanAttribute(default=False)
    created_at = UnicodeAttribute(null=False)
    updated_at = UnicodeAttribute(null=False)