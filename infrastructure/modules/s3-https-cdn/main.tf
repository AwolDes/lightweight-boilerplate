terraform {
  backend "s3" {}
}

module "cdn" {
  source             = "git::https://github.com/cloudposse/terraform-aws-cloudfront-cdn.git?ref=master"
  namespace          = "${var.cdn_namespace}"
  stage              = "${var.cdn_stage}"
  name               = "${var.cdn_name}"
  acm_certificate_arn = "${var.cert_arn}"
  aliases            = ["${var.domain_name}"]
  origin_domain_name = "${var.website_endpoint}"
  origin_protocol_policy = "${var.origin_protocol_policy}"
  default_ttl = "${var.cdn_ttl}"
  viewer_protocol_policy = "${var.cdn_viewer_protocol}"
  parent_zone_id = "${var.hosted_zone_id}"
  allowed_methods = ["GET", "HEAD"]
  forward_query_string = "true"
}
