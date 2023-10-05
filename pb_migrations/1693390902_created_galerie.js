/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6o8fvo5rz2fbegh",
    "created": "2023-08-30 10:21:42.534Z",
    "updated": "2023-08-30 10:21:42.534Z",
    "name": "galerie",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7junublo",
        "name": "picture",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6o8fvo5rz2fbegh");

  return dao.deleteCollection(collection);
})
