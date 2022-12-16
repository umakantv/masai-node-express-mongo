

# Mongoose

Q. What is the data that we want to store?

A. Employee Info

```js
{
    _id: ObjectId(),
    name: String,
    designation: String,
    dateOfBirth: Date,
    gender: String
}
```

0. Connect to Database
1. Schema
2. Model
   * With Schema, mongoose provides us consistency to have data-type validation
   * With schema, we check that only the mentioned fields reach our database
   * It is flexible enough to allow introduction of new fields
3. [Validation](https://mongoosejs.com/docs/schematypes.html#schematype-options)