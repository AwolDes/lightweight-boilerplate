import uuid
import json
import datetime
from flask import request
from flask_restful import Resource
from models.user import UserModel
from factories.response_factory import success_response, err_response
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                get_jwt_identity, get_raw_jwt, get_jti)
from schemas.schemas import UserSchema, CreateUserSchema, ErrorSchema, SuccessSchema
from flask_restful_swagger_2 import swagger
from utils.logging import log_event

class Signup(Resource):
    @swagger.doc({
        'tags': ['user'],
        'description': 'Creates a user',
        'parameters': [
            {
                'name': 'user',
                'description': 'Fields needed for signup',
                'in': 'body',
                'schema': CreateUserSchema
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
                        'accessToken': '1733b7d2-94db-4e73-8165-35ae448a1f59',
                        'refreshToken': '2986d84a-9e17-46db-8580-0c96747d17f0'
                    }
                }
            },
            '404': {
                'description': 'User already exists response',
                'schema': ErrorSchema,
                'examples': {
                    'application/json': {
                        'error': True,
                        'message': 'User already exists'
                    }
                }
            }
        }
     })
    def post(self):
        log_event("POST: /signup")
        body = request.get_json(force=True)
        try:
            for user in UserModel.scan(UserModel.email == (body['email'])):
                return err_response('User already exists', 404)

            user_id = str(uuid.uuid4())
            try:
                user = UserModel(user_id)
                user.email = body['email']
                user.firstName = body['firstName']
                user.lastName = body['lastName']
                user.password = pbkdf2_sha256.encrypt(body['password'], salt_size=16)
                now = datetime.datetime.utcnow().isoformat()
                user.created_at = now
                user.updated_at = now

                access_token = create_access_token(identity=body['email'])
                refresh_token = create_refresh_token(identity=body['email'])
                access_token_jti = get_jti(access_token)
                refresh_token_jti = get_jti(refresh_token)

                user.accessToken = access_token_jti
                user.refreshToken = refresh_token_jti

                user.save()
                return success_response({
                    'message': 'Created user successfully',
                    'uuid': user_id,
                    'accessToken': access_token,
                    'refreshToken': refresh_token
                })
            except Exception as e:
                return err_response(e, 400)
        except Exception as e:
                return err_response(e, 400)
    
