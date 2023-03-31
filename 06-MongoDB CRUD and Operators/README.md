
# MongoDB Advanced Operations

- [MongoDB Advanced Operations](#mongodb-advanced-operations)
  - [MongoDB Commands](#mongodb-commands)
    - [Import Data](#import-data)
    - [Show Databases](#show-databases)
    - [Switch Database](#switch-database)
    - [Create Collection](#create-collection)
    - [Show Collections](#show-collections)
  - [CRUD Operations](#crud-operations)
    - [Create Document in a collection](#create-document-in-a-collection)
    - [Insert Many](#insert-many)
    - [Find Documents in a collection](#find-documents-in-a-collection)
    - [Update Document in a collection](#update-document-in-a-collection)
    - [Delete Documents](#delete-documents)
  - [More Functions](#more-functions)
    - [Sort, Limit, Skip](#sort-limit-skip)
    - [Count](#count)
  - [MongoDB Operators](#mongodb-operators)
    - [Comparison Operators](#comparison-operators)
    - [Logical Operators](#logical-operators)
    - [Array Operators](#array-operators)
    - [Element Operators](#element-operators)
    - [Evaluation Operators](#evaluation-operators)


## MongoDB Commands

### Import Data

https://www.mongodb.com/docs/database-tools/mongorestore/

Run this in terminal, not in mongosh.
```
mongodump --db users-example // this will export all the data in a dump folder
mongorestore --db users-example users.bson
```

### Show Databases

```
show dbs
```


### Switch Database

```
use pt-web-9
```

### Create Collection

```
db.createCollection('students')
```

### Show Collections

```
show collections
```

## CRUD Operations

### Create Document in a collection

```js
db.lectures.insertOne({ title: 'Nodejs Intro', sprint: 1, date: "2022-12-08" })
```

### Insert Many

```js
db.users.insertMany([
    { 
        name: 'Vikas Yadav',
        gender: 'Male',
        shirt_size: '2XL',
        language: 'Malayalam',
        age: 26
    },
    {
        name: 'Monika',
        gender: 'Female',
        shirt_size: 'S',
        language: 'English',
        age: 30
    },
    {
        name: 'Ross Geller',
        gender: 'Male',
        shirt_size: 'XL',
        language: 'English',
        age: 29
    }
])
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

db.users.updateMany(
    {  
        age: 20,
    }, 
    {
        $set: { 
            age: 24,
            graduated: true
        }
    }
)

```

### Delete Documents

```js

// db.user.findOneAndDelete()

db.user.deleteMany({ name: 'Vikas Yadav' })
```

## More Functions

### Sort, Limit, Skip

```js

db.users.find({shirt_size: 'L'}).sort({
    name: 1 // -1 for descending order
})

db.users.find().sort({
    shirt_size: 1,
    name: 1 // -1 for descending order
})

// Skipping first 2 records
db.users.find().sort({ shirt_size: 1, name: 1  }).limit(3).skip(2)
```

### Count

```js
db.users.countDocuments()

db.users.countDocuments({ shirt_size: 'XL' })
```


## MongoDB Operators

```js

db.users.find({
    field_name1 : {
        operator1 : value1,
        operator2 : value2,
    },
    field_name2 : {
        operator3 : value3,
        operator4 : value4,
    }
})

```

### Comparison Operators

'<', '>', '<=', '>=', $ne, $eq

```js
db.users.find({
    age: {
        $lt: 60, // '<'
        $gt: 40, // '>'
        $gte: 41, // '>='
        $lte: 59, // '<='
    }
})

db.users.find({ name: { $eq: 'Monika'} })

db.users.find({ name: 'Monika' })

db.users.find({ name: { $eq: 'Monika'}, age: { $lt: 30} })
```

$in, $nin

```js
db.users.find({ 
    name: { 
        $in: ['Monika', 'Ross Geller', 'Chandler'] // all documents for which name matches values in this array will be included
    },
    age: {
        $nin: [30, 31, 32] // all documents for which age matches values in this array will not be included
    }
})
```

### Logical Operators

Used to combine different conditions  

AND, OR, NOT, NOR

```js

db.users.find({
    $logical_operator: [
        {
            // $condition1
            name: {},
            age: {},
            shirt_size: {},
        },
        {
            // $condition2
            name: {},
            age: {},
            shirt_size: {},
        },
        {
            // $condition3
            name: {},
            age: {},
            shirt_size: {},
        }
    ]
})

db.users.find({ 
    $and: [
        {
            name: { 
                $in: ['Monika', 'Ross Geller', 'Chandler']
            },
        },
        {
            age: {
                $nin: [30, 31, 32]
            }
        }
    ]
})


db.users.find({ 
    $or: [
        {
            name: { 
                $in: ['Monika', 'Chandler']
            },
        },
        {
            age: {
                $in: [29, 31, 32]
            }
        }
    ]
})

db.users.find({ 
    age: {
        $not: {
            $in: [29, 30, 22]
        }
    }
})

db.users.find({ 
    age: {
        $not: {
            $lt: 29
        }
    }
})

db.users.find({ 
    $nor: [ // MUST FAIL ALL CONDITIONS
        {
            name: { 
                $in: ['Monika', 'Ross Geller', 'Chandler']
            },
        },
        {
            age: {
                $in: [30, 31, 32]
            }
        }
    ]
})
```

### Array Operators

$all, $size, $elemMatch

```js

db.users.find({
    friends: {
        $all: ['Ross', 'Chandler'] // all these values must be present
    }
})

db.users.find({
    friends: {
        $size: 6
    }
})

db.users.find({
    friends: {
        $elemMatch: { // any element in the array which matches this condition
            $lt: 'Z',
            $gt: 'P'
        }
    }
})

```

### Element Operators

$exists, $type

```js
db.users.find({ 
    friends: { 
        $exists: true // field exists or not
    }  
})

db.users.find({ 
    age: { 
        $exists: true,
        $type: 'number' // 
    }  
})

db.users.find({ graduated: { $exists: true, $type: 'bool' } })

```


### Evaluation Operators

$mod, $regex, $text

```js

db.users.find({ 
    age: { 
        $mod: [4, 1] // when age is divided by 4, remainder should be 1
    }
})

db.users.find({
    name: {
        $regex: /^Mon/
    }
})

db.users.createIndex({  name: 'text' })

// title_text

```

```js
db.posts.createIndex({ title: 'text', content: 'text'  })
// title_text_content_text


db.posts.insertMany([
    {
        title: 'Nodejs Intro',
        content: 'Introduction to Nodejs'
    },
    {
        title: 'MongoDb Intro',
        content: 'Introduction to Mongodb'
    },
    {
        title: 'Graphql Intro',
        content: 'Introduction to Express'
    },
    {
        title: 'Auth Intro',
        content: 'Introduction to OAuth'
    }
])

db.posts.find({ 
    $text: {
        $search: 'intro graphql'
    } 
})


db.posts.find({ 
    $text: {
        $search: 'course graphql'
    } 
})

```


```js
db.users.updateMany({ 
    $or: [ 
        { name: { $in: ['Monika', 'Ross Geller', 'Chandler'] } }, { age: { $in: [30, 31, 32] } }
    ] 
}, 
{ 
    $set: { 
        friends: ['Monika', 'Ross', 'Chandler', 'Phoebe', 'Joe', 'Rachel']  
    } 
})
```