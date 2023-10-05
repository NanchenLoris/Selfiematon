/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6o8fvo5rz2fbegh")

  // remove
  collection.schema.removeField("7junublo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "knkba5vh",
    "name": "image_url",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6o8fvo5rz2fbegh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7junublo",
    "name": "picture",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 524288000000000000,
      "mimeTypes": [
        "image/png",
        "image/jpeg"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("knkba5vh")

  return dao.saveCollection(collection)
})
