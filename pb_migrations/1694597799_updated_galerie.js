/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6o8fvo5rz2fbegh")

  // remove
  collection.schema.removeField("u69yojmd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ee0cvawf",
    "name": "picture",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 524288000,
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
    "id": "u69yojmd",
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
  collection.schema.removeField("ee0cvawf")

  return dao.saveCollection(collection)
})
