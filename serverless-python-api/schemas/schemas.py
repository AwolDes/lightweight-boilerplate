from flask_restful_swagger_2 import Schema

class ErrorSchema(Schema):
    type = 'object'
    properties = {
        'error': {
            'type': 'boolean',
        },
        'message': {
            'type': 'string',
        }
    }

class SuccessSchema(Schema):
    type = 'object'
    properties = {
        'message': {
            'type': 'string',
        }
    }

class UserSchema(Schema):
    type = 'object'
    properties = {
        'uuid': {
            'type': 'string',
            'format': 'guid',
        },
        'firstName': {
            'type': 'string'
        },
        'lastName': {
            'type': 'string'
        },
        'email': {
            'type': 'string'
        },
        'password': {
            'type': 'string'
        },
        'verified': {
            'type': 'boolean'
        },
        'accessToken': {
            'type': 'string',
            'format': 'jti'
        },
        'refreshToken': {
            'type': 'string',
            'format': 'jti'
        },
        'created_at': {
            'type': 'string',
            'format': 'iso_date_string'
        },
        'updated_at': {
            'type': 'string',
            'format': 'iso_date_string'
        }
    }
    required = ['name', 'email', 'password']

class CreateUserSchema(Schema):
    type = 'object'
    properties = {
        'firstName': {
            'type': 'string'
        },
        'lastName': {
            'type': 'string'
        },
        'email': {
            'type': 'string'
        },
        'password': {
            'type': 'string'
        },
    }
    required = ['firstName', 'email', 'password']

class LoginUserSchema(Schema):
    type = 'object'
    properties = {
        'email': {
            'type': 'string'
        },
        'password': {
            'type': 'string'
        },
    }
    required = ['email', 'password']

class UpdateUserSchema(Schema):
    type = 'object'
    properties = {
        'firstName': {
            'type': 'string'
        },
        'lastName': {
            'type': 'string'
        },
        'email': {
            'type': 'string'
        }
    }