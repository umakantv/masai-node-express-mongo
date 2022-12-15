
# MongoDB Advanced Operations

## Import Data

```
mongorestore --db users-example users.bson
```

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

db.user.findOneAndDelete()

db.user.deleteMany({ name: 'Vikas Yadav' })
```


## MongoDB Operators

```js

db.user.find({
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
db.user.find({
    name: {
        $lt: 'E', // '<'
        $gt: 'D', // '>'
        $gte: 'D', // '>='
        $lte: 'D', // '<='
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
            // $condition2
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

db.users.find({ 
    age: {
        $not: {
            $in: [24, 20, 22]
        }
    }
})

db.users.find({ 
    $nor: [
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
        $all: ['Ross', 'Chandler'] // 
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
    }
])

db.posts.find({ 
    $text: {
        $search: 'intro graphql'
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
