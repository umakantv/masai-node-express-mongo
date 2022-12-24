
# Databases and MongoDB Introduction

Board Link: https://excalidraw.com/#json=hjt-sr_tJpdAYeH4ZOnA_,Z1hD_3Msxpr5LhOimSE6Gw

### Show Databases

```
shwo dbs
```


### Switch Database

```
use pt-web-7
```

### Create Collection

```
db.createCollection('lectures')
```

### Show Collections

```
show collections
```

### Create Document in a collection

```js
db.<collection_name>.insertOne({ title: 'Nodejs Intro', sprint: 1, date: "2022-12-08" })
```

### Find Documents in a collection

```js
db.lectures.find()

db.lectures.find({ title: "MongoDB" })

db.lectures.findOne({ _id: ObjectId("6399f881d17280baeb06c26f") })
```


### Update Document in a collection

```js

db.lectures.updateOne({ _id: ObjectId("6399f9efd17280baeb06c270") }, {$set: { title: 'Updated 2'}})
```
