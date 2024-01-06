# Database/API Calls

## Form Data

### Get brand names

```json
{
  "brands": [
    {
      "id": "number",
      "name": "string"
    }
  ]
}
```

### Get product group names

```json
{
  "productGroups": [
    {
      "id": "number",
      "name": "string"
    }
  ]
}
```

### Get category names

```json
{
  "categories": [
    {
      "id": "number",
      "name": "string",
      "parent": {
        "id": "number",
        "name": "string"
      }
    }
  ]
}
```

### Get attribute names for product group

```json
{
  "attributes": [
    {
      "id": "number",
      "name": "string"
    }
  ]
}
```


