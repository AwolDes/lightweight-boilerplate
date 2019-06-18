output "website_domain" {
  value = "${aws_s3_bucket.static_site.website_domain}"
}

output "website_endpoint" {
  value = "${aws_s3_bucket.static_site.website_endpoint}"
}

output "bucket_name" {
  value = "${aws_s3_bucket.static_site.id}"
}