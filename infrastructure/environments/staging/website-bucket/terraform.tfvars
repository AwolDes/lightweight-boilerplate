
terragrunt = {
  include {
    path = "${find_in_parent_folders()}"
  }

  terraform {
    source = "../../../modules//s3-website-bucket"
  }
}

stage = "prod"
profile = "personal"
region = "ap-southeast-2"

s3_bucket_name = "NAME THE BUCKET THE SAME AS YOUR DOMAIN"