data "azurerm_client_config" "current" {}

# Generate random resource group name
resource "random_pet" "rg_name" {
  prefix = var.resource_group_name_prefix
}

resource "azurerm_resource_group" "rg" {
  location = var.resource_group_location
  name     = random_pet.rg_name.id
}

# Generate random value for the storage account name
resource "random_string" "storage_account_name" {
  length  = 8
  lower   = true
  numeric = false
  special = false
  upper   = false
}

resource "azurerm_storage_account" "storage_account" {
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  name = random_string.storage_account_name.result

  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  min_tls_version          = "TLS1_2"

  static_website {
    index_document = "index.html"
  }
}

resource "azurerm_storage_blob" "example" {
  for_each = fileset("${path.root}/../dist", "**/*")

  name                   = each.value
  storage_account_name   = azurerm_storage_account.storage_account.name
  storage_container_name = "$web"
  type                   = "Block"
  content_type           = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)
  source                 = "${path.root}/../dist/${each.value}"
  content_md5            = filemd5("${path.root}/../dist/${each.value}")
  # Terraform の azurerm_storage_blob(Version 3.1140) には content_encoding がない。
  # https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_blob
  # API的には存在する
  # https://learn.microsoft.com/ja-jp/rest/api/storageservices/put-blob
}
