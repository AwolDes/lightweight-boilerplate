import json
import os

from passlib.hash import pbkdf2_sha256
import datetime
from models.user import UserModel
from factories.response_factory import success_response, err_response

from flask import request
from flask_restful import Resource, reqparse
from models import model_helpers
from schemas.schemas import UserSchema, UpdateUserSchema, ErrorSchema, SuccessSchema
from flask_restful_swagger_2 import swagger
from utils.logging import log_event

class User(Resource):
    @swagger.doc({
        'tags': ['user'],
        'description': 'Returns a user',
        'parameters': [
            {
                'name': 'user_id',
                'description': 'User identifier',
                'in': 'path',
                'type': 'integer'
            }
        ],
        'responses': {
            '200': {
                'description': 'User response',
                'schema': UserSchema,
                'examples': {
                    'application/json': {
                        'uuid': 'b8b54ffa-18c4-4910-9212-8e6c8a25aed',
                        'email': 'someone@mail.com',
                        'firstName': 'Joe',
                        'lastName': 'Johnson',
                        'accessToken': '1733b7d2-94db-4e73-8165-35ae448a1f59',
                        'refreshToken': '2986d84a-9e17-46db-8580-0c96747d17f0',
                        'verified': False,
                    }
                }
            },
            '404': {
                'description': 'User does not exist response',
                'schema': ErrorSchema,
                'examples': {
                    'application/json': {
                        'error': True,
                        'message': 'User does not exist'
                    }
                }
            },
            '500': {
                'description': 'Error getting user',
                'schema': ErrorSchema,
                'examples': {
                    'application/json': {
                        'error': True,
                        'message': 'Error getting user'
                    }
                }
            }
        }
     })
    def get(self, user_id):
        log_event(f"GET: /users/{user_id}")
        try:
            user = UserModel.get(user_id, attributes_to_get=['uuid', 'accessToken', 'refreshToken', 'email', 'firstName', 'lastName'])
            user = model_helpers.model_to_dict(user)
            return success_response(user)
        except UserModel.DoesNotExist:
            return err_response('User does not exist', 404)
        except Exception:
            return err_response('Error getting user', 500)

    @swagger.doc({
        'tags': ['user'],
        'description': 'Updates a user',
        'parameters': [
            {
                'name': 'user_id',
                'description': 'User identifier',
                'in': 'path',
                'type': 'integer'
            },
            {
                'name': 'user',
                'description': 'Fields that the user is allowed to update',
                'in': 'body',
                'schema': UpdateUserSchema
            }
        ],
        'responses': {
            '200': {
                'description': 'User updated response',
                'schema': SuccessSchema,
                'examples': {
                    'application/json': {
                        'message': 'Succesfully updated user'
                    }
                }
            },
            '400': {
                'description': 'User does not exist response',
                'schema': ErrorSchema,
                'examples': {
                    'application/json': {
                        'error': True,
                        'message': 'Invalid email'
                    }
                }
            }
        }
     })
    
    def patch(self, user_id):
        log_event(f"PATCH: /users/{user_id}")
        body = request.get_json(force=True)
        user = UserModel.get(user_id)
        for item in body:
            try:
                user.update_item(attribute=item, value=body[item], action='PUT')
                user.update_item(attribute='updated_at', value=datetime.datetime.utcnow().isoformat(), action='PUT')
            except Exception as e:
                return err_response(e, 400)
        return success_response({'message': 'Successfully updated user'})
