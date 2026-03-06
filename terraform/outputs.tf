output "bucket_endpoint" {
  description = "S3 bucket website endpoint"
  value       = aws_s3_bucket_website_configuration.portfolio_website.website_endpoint
}

output "cloudfront_domain" {
  description = "CloudFront Distribution Domain Name"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}
