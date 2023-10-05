/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6o8fvo5rz2fbegh")

  // remove
  collection.schema.removeField("kwkg4lig")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6o8fvo5rz2fbegh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kwkg4lig",
    "name": "picture",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 52428800000000,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("ehgfhrz2")

  return dao.saveCollection(collection)
})
