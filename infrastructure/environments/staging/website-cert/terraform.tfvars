terragrunt = {
  include {
    path = "${find_in_parent_folders()}"
  }

  terraform {
    source = "../../../modules//acm-cert"
  }
}

stage = "prod"
profile = "personal"
region = "us-east-1"

domain_name = "CHANGE ME"