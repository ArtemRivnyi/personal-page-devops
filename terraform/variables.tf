variable "aws_region" {
  description = "AWS Region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "The primary domain name for the website"
  type        = string
  default     = "artemrivnyi.com"
}

variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
  default     = "artemrivnyi-portfolio-static"
}
