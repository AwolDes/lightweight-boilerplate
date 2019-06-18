terraform {
  backend "s3" {}
}

resource "aws_route53_zone" "default" {
  name = "${var.domain_name}"
}

module "cert" {
  source = "github.com/azavea/terraform-aws-acm-certificate?ref=0.1.0"

  domain_name               = "${var.domain_name}"
  subject_alternative_names = ["*.${var.domain_name}"]
  hosted_zone_id            = "${aws_route53_zone.default.zone_id}"
  validation_record_ttl     = "60"
}