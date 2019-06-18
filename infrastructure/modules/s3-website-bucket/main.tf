terraform {
  backend "s3" {}
}
resource "aws_s3_bucket" "static_site" {
  bucket = "${var.s3_bucket_name}"
  acl    = "public-read"

  policy = <<EOF
{
  "Id": "bucket_policy_site",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "bucket_policy_site_main",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.s3_bucket_name}/*",
      "Principal": "*"
    }
  ]
}
EOF

  website {
    index_document = "index.html"
  }
}