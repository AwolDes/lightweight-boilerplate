output "cert_arn" {
  value = "${module.cert.arn}"
}

output "hosted_zone" {
  value = "${aws_route53_zone.default.zone_id}"
}
