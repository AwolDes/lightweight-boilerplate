import json
import os

from flask_jwt_extended import (create_access_token, create_refresh_token,
                                get_jwt_identity, get_raw_jwt, get_jti)
from passlib.hash import pbkdf2_sha256
import datetime
from models.user import UserModel
from factories.response_factory import success_response, err_response

from flask import request
from flask_restful import Resource
from schemas.schemas import UserSchema, LoginUserSchema, ErrorSchema, SuccessSchema
from flask_restful_swagger_2 import swagger
from utils.logging import log_event

class Login(Resource):
    @swagger.doc({
        'tags': ['user'],
        'description': 'Logs a user in',
        'parameters': [
            {
                'name': 'user',
                'description': 'Fields required to log user in',
                'in': 'body',
                'schema': LoginUserSchema
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
                'description': 'Incorrect login details',
                'schema': ErrorSchema,
                'examples': {
                    'application/json': {
                        'error': True,
                        'message': 'Incorrect login details'
                    }
                }
            }
        }
     })
    
    def post(self):
        log_event("POST: /login")
        body = request.get_json(force=True)
        err_response_message = 'Incorrect login details'
        for user in UserModel.scan(UserModel.email == (body['email'])):

            email = user.email
            password_hash = user.password
            password = body['password']

            if pbkdf2_sha256.verify(password, password_hash):
                access_token = create_access_token(identity=email)
                refresh_token = create_refresh_token(identity=email)

                access_token_jti = get_jti(access_token)
                refresh_token_jti = get_jti(refresh_token)

                user.update(
                    actions=[
                        UserModel.accessToken.set(access_token_jti),
                        UserModel.refreshToken.set(refresh_token_jti),
                        UserModel.updated_at.set(datetime.datetime.utcnow().isoformat()),
                    ]
                )

                return success_response({
                    'uuid': user.uuid,
                    'accessToken': access_token,
                    'refreshToken': refresh_token
                })
            else:
                return err_response(err_response_message, 404)
        return err_response(err_response_message, 404)
