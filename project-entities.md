## Project Entities
### Customer
```json
{
  "id": "uuid",
  "email": "string",
  "profile": {
    "firstName": "string",
    "lastName": "string",
    "addresses": [
      {
        "id": "uuid",
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string",
        "country": "string",
        "isBillingAddress": "boolean",
        "isShippingAddress": "boolean"
      }
    ],
    "phoneNumbers": [
      {
        "id": "uuid",
        "number": "string",
        "isPrimary": "boolean"
      }
    ],
    "orders": "array",
    "paymentMethods": "array"
  }
}
```

### Order
```json
{
  "id": "uuid",
  "orderNumber": "string",
  "orderDate": "string",
  "orderStatus": "string",
  "orderTotal": "number",
  "orderItems": [
    {
      "id": "uuid",
      "productId": "uuid",
      "quantity": "number",
      "price": "number"
    }
  ]
}
```

### Product
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "briefDescription": "string",
  "productSet": {
    "id": "uuid",
    "name": "string",
    "attributes": [
      {
        "id": "number",
        "name": "string"
      }
    ]
  },
  "attributes": [
    {
      "id": "number",
      "name": "string",
      "value": "string"
    }
  ],
  "price": "number",
  "thumbnail": {
    "id": "uuid",
    "url": "string"
  },
  "images": [
    {
      "id": "uuid",
      "url": "string"
    }
  ],
  "reviews": [
    {
      "id": "uuid",
      "rating": "number",
      "review": "string",
      "customer": {
        "id": "uuid",
        "email": "string"
      }
    }
  ],
  "brand": {
    "id": "number",
    "name": "string"
  },
  "categories": [
    {
      "id": "number",
      "name": "string",
      "parent": {
        "id": "number",
        "name": "string"
      }
    }
  ],
  "tags": [
    {
      "id": "number",
      "name": "string"
    }
  ]
}
```

### Product Group
```json
{
  "id": "uuid",
  "name": "string",
  "attributes": [
    {
      "id": "number",
      "name": "string"
    }
  ],
  "products": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "briefDescription": "string",
      "attributes": [
        {
          "id": "number",
          "name": "string",
          "value": "string"
        }
      ],
      "price": "number",
      "thumbnail": {
        "id": "uuid",
        "url": "string"
      },
      "images": [
        {
          "id": "uuid",
          "url": "string"
        }
      ],
      "reviews": [
        {
          "id": "uuid",
          "rating": "number",
          "review": "string",
          "customer": {
            "id": "uuid",
            "email": "string"
          }
        }
      ],
      "brand": {
        "id": "number",
        "name": "string"
      },
      "categories": [
        {
          "id": "number",
          "name": "string",
          "parent": {
            "id": "number",
            "name": "string"
          }
        }
      ],
      "tags": [
        {
          "id": "number",
          "name": "string"
        }
      ]
    }
  ]
}
```

### Product Group Display
```json
{
  "id": "uuid",
  "name": "string",
  "thumbnail": {
    "id": "uuid",
    "url": "string"
  },
  "brand": {
    "id": "number",
    "name": "string"
  },
  "category": {
    "id": "number",
    "name": "string",
    "parent": {
      "id": "number",
      "name": "string"
    }
  },
  "attributes": [
    {
      "id": "number",
      "name": "string"
    }
  ],
  "products": [
    {
      "id": "uuid",
      "name": "string",
      "briefDescription": "string",
      "price": "number",
      "images": [
        {
          "id": "uuid",
          "url": "string"
        }
      ],
      "reviews": [
        {
          "id": "uuid",
          "rating": "number",
          "review": "string",
          "customer": {
            "id": "uuid",
            "email": "string"
          }
        }
      ],
      "tags": [
        {
          "id": "number",
          "name": "string"
        }
      ]
    }
  ]
}

```