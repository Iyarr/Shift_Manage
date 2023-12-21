provider "aws" {
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
  region     = var.aws_region
}

resource "aws_dynamodb_table" "users" {
  name           = "Users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "password"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  attribute {
    name = "is_admin"
    type = "B"
  }
}

resource "aws_dynamodb_table" "shifts" {
  name           = "Shifts"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "constantkey"
  range_key      = "part"

  attribute {
    name = "constantkey"
    type = "S"
  }

  attribute {
    name = "part"
    type = "S"
  }

}