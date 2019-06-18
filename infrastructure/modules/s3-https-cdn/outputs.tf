output "cdn_arn" {
  value = "${module.cdn.cf_arn}"
  description = "CDN ARN"
}

output "cdn_aliases" {
  value = "${module.cdn.cf_aliases}"
  description = "CDN CNAME aliases"
}

output "cdn_id" {
  value = "${module.cdn.cf_id}"
  description = "CDN ID"
}

