variable "domain_name" {
  default = "something.com"
  description = "Domain name to create a s3 bucket, certificate & Cloudfront distribution for"
}

variable "website_endpoint" {
  description = "S3 website endpoint"
}


variable "record_ttl" {
  default = "60"
  description = "Validation record TTL for ACM certificate"
}

variable "cdn_namespace" {
  default = "pearce"
  description = "Namespace of the CDN"
}

variable "cdn_stage" {
  default = "dev"
  description = "Stage of the CDN"
}

variable "cdn_name" {
  description = "Name of the CDN"
}

variable "cdn_ttl" {
  default = "60"
  description = "Default TTL of cached objects"
}


variable "cert_arn" {
  description = "ARN of existing ACM Certificate ARN"
}

variable "cdn_viewer_protocol" {
  default = "redirect-to-https"
  description = "CDN Viewer protocol policy"
}


variable "hosted_zone_id" {
  description = "Hosted Zone ID for CDN"
}

variable "origin_protocol_policy" {
  description = "Origin protocol policy"
}


