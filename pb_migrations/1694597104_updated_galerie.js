/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6o8fvo5rz2fbegh")

  // remove
  collection.schema.removeField("ehgfhrz2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3wsqxesb",
    "name": "picture",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 524288000000,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6o8fvo5rz2fbegh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ehgfhrz2",
    "name": "picture",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // remove
  collection.schema.removeField("3wsqxesb")

  return dao.saveCollection(collection)
})
