variable "stage" {
  default     = "dev"
  description = "Stage to deploy to"
}

variable "profile" {
  description = "AWS profile to use"
}

variable "region" {
  default     = "ap-southeast-2"
  description = "AWS Region to deploy to"
}

provider "aws" {
  region  = "${var.region}"
  profile = "${var.profile}"
}