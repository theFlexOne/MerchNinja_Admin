### ProductCreationData

```json
{
  "name": "string",
  "description": "string",
  "base_price": "number",
  "thumbnail": "string",
  "brandId": "number",
  "subcategoryId": "number",
  "status": "string",
  "tags": ["string"],
  "metaData": {
    "key": "string"
  },
  "variants": [
    {
      "price": "number",
      "sku": "string",
      "quantity": "number",
      "images": ["string"],
      "metaData": "json",
      "attributes": [
        {
          "key": "string",
          "value": "string"
        }
      ]
    }
  ]
}
```

### ProductDetail

```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "thumbnail": "string",
  "base_price": "number",
  "brand": {
    "id": "number",
    "name": "string"
  },
  "subcategory": {
    "id": "number",
    "name": "string",
    "category": {
      "id": "number",
      "name": "string"
    }
  },
  "status": "product_status_type",
  "specs": {
    "key": "string"
  },
  "tags": [
    {
      "id": "number",
      "name": "string"
    }
  ],
  "reviews": [
    {
      "id": "uuid",
      "message": "string",
      "rating": "number",
      "customer": {
        "id": "uuid",
        "name": "string",
        "email": "string"
      }
    }
  ],
  "variants": [
    {
      "id": "string",
      "name": "string",
      "price": "number",
      "attributes": [
        {
          "name": "string",
          "value": "string"
        }
      ]
    }
  ]
}
```