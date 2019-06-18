# lightweight-boilerplate
React &amp; Serverless RESTful API boilerplate

# Why does this exist?
This is a lightweight boilerplate to be used in hackathons or to quickly spin up and test an idea. React is the chosen frontend, and for the backend there is different examples for using the serverless framework to build a basic API.

I've been working with serverless both professionally and on the side since 2016, and this boilerplate represents pretty much everything I've learned in terms of structure and libraries.

# Features
- React & Redux frontend, based off [Create React App](https://github.com/facebook/create-react-app)
  - SCSS hot reloading
  - Normalize scss
  - Grid css
  - A pattern for forms and form validation
- Terraform backed infrastructure
  - Includes an S3 bucket & Cloudfront CDN for HTTPS on the React Frontend
- Serverless Projects
    - Pruning plugin used automatically
    - Bcrypt password hashing
    - Patterns for multiple environment configrations/secrets
- Python API
  - Basic JWT Auth
  - Bcrypt password hashing
  - User CRUD
  - Swagger Auto generating Docs
  - Field Validation patterns
- JavaScript API
  - Bcrypt password hashing
  - Bundled with webpack
  - Linting
  - User CRUD

# How do I use it?

You can either clone the repo, or take advantage of Githubs new [repo templating](https://help.github.com/en/articles/creating-a-repository-from-a-template) feature!

# Python API
The Python serverless API uses [Flask RESTful](https://flask-restful.readthedocs.io/en/latest/) as a quick way to build out an API. It also uses JWT Authentication out of the box

As a datastore, the project uses DynamoDB, with [PynamoDB](https://github.com/pynamodb/PynamoDB) as the interface. The boilerplate also includes support for swagger docs if desired.

# JavaScript API
The JavaScript serverless API is structured diferently to Python, and has a function for each endpoint. It uses webpack to bundle the package, and uses [Dynogels](https://github.com/clarkie/dynogels) to interface with DynamoDB.

# Golang API
Will figure this out :)

# TODO
- [ ] Tests for Python
- [ ] Auth for JS
- [ ] Validations for JS
- [ ] Swagger docs for JS
- [ ] Tests for JS
- [ ] Auth for Golang
- [ ] Tests for Golang
- [ ] Add settings form fields for react frontend
- [ ] Add a graphql serverless service
- [ ] CI/CD as code

# Want more features?
Create an issue in the repo and tag it with the _feature-request_ tag  with details about what you'd like added to the boilerplate!
