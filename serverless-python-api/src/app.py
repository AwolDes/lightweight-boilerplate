from flask import Flask, request
import logging
from flask.logging import default_handler
from flask_restful_swagger_2 import Api
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required, jwt_refresh_token_required
from flask_cors import CORS
from src.auth.signup import Signup
from src.auth.login import Login
from src.user.user import User

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app, api_version='0.0', api_spec_url='/api/swagger')

app.config['JWT_SECRET_KEY'] = 'somekeyfgornow'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
jwt = JWTManager(app)

api.add_resource(Signup, '/auth/signup')
api.add_resource(Login, '/auth/login')
api.add_resource(User, '/users/<string:user_id>')

if __name__ == '__main__':
    app.run(debug=True)