# https://novemberfive.co/blog/opensource-pypi-package-repository-tutorial/

terragrunt = {
  include {
    path = "${find_in_parent_folders()}"
  }

  terraform {
    source = "../../../modules//s3-https-cdn"
  }
}

stage = "prod"
profile = "personal"
region = "ap-southeast-2"

domain_name = "YOUR DOMAIN"
website_endpoint = "YOUR DOMAIN.s3-website-ap-southeast-2.amazonaws.com"
cdn_namespace =  "NAMESPACE"
cdn_stage =  "prod"
cdn_name = "CDN NAME"
cdn_viewer_protocol = "https-only"
origin_protocol_policy = "http-only"
cert_arn = "CERT ARN"
hosted_zone_id = "DOMAIN HOSTED ZONE ID"
