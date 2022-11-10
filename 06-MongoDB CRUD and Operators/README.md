# MongoDB Operations

* Create Database

`use database-name` switches to that db, temporarily  
`db.createCollection('users')` - creates the database if it does not exist and adds a collection  

* CRUD Operations

## Read

### Find All
`db.users.find()` returns an array  

### Find One
`db.users.findOne(options)` returns a document  
`db.users.findOne({ key: value })` returns a document if the search matches  

```js
db.users.findOne({ name: 'John Doe' })

{
  _id: ObjectId("632c7499abdc8fb2bfab8b5f"),
  name: 'John Doe',
  email: 'john.doe@john.doe',
  password: 'john123doe'
}

db.users.findOne({ name: 'John doe' })
null
```


## Create

### Insert One

```js
db.users.insertOne({ 
    name: 'John Doe', 
    email: 'john.doe@john.doe', 
    password: 'john123doe' 
})
```

### Insert Many

```js
db.users.insertMany([
    { 
        name: 'John Doe', 
        email: 'john.doe@john.doe', 
        age: 23,

        password: 'john123doe' 
    },
    { 
        name: 'John Dow', 
        email: 'john.dow@john.doe', 
        age: 26,
        password: 'john123doe' 
    },
    { 
        name: 'John Doe', 
        email: 'john.dope@john.doe', 
        age: 37,
        password: 'john123do' 
    },
])

{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("632c77bbabdc8fb2bfab8b60"),
    '1': ObjectId("632c77bbabdc8fb2bfab8b61"),
    '2': ObjectId("632c77bbabdc8fb2bfab8b62")
  }
}
```

## Update

### Update One

```js
db.users.updateOne(filterOptions, updateOptions)

// It is combination of findOne - filterOptions match the first document
// updatedOptions will be updated in found document

db.users.updateOne({ 
    name: 'John Doe'
}, { 
    $set: {
        name: 'Jane Doe'
    }
})
```

### Update Many

```js
db.users.updateMany(filterOptions, updateOptions)

// It is combination of findMany - filterOptions match all the document
// updatedOptions will be updated in all found documents

db.users.updateMany({ 
    name: 'John Doe',
    age: 23
}, { 
    $set: {
        name: 'Jane Doe',
        age: 24
    }
})
```

## Delete

### Delete One

`db.users.deleteOne({ name: 'Jane Doe' })` will find the first document that matches the search and delete it  

### Delete Many

`db.users.deleteMany({ name: 'Jane Doe' })` will find all documents that match the search and delete them  

## MongoDB Operators

### Syntax

```js

// key is the property name - eg email
// 
db.users.find({
    key: value, // exact match
    key: {
        $operator: value
    },
    key1: {
        $operator1: value1,
        $operator2: value2,
    },
    key2: {
        $operator3: value3,
        $operator1: value4,
    }
})

db.users.find({
    name: { $eq: 'John Doe' },
    email: { 
        $lte: 'john.dos'
    },
})

```

[Sample Data](https://gist.github.com/Sparkenstein/4306a13c3ccfa93a34ac4b43993bd66d)

### Comparison Operators

1. $eq - Equality, $ne Non-equal
```js

db.users.find({ name: { $eq: 'umakant'} })

db.users.find({ name: 'Umakant' })

db.users.find({ name: { $ne: 'Umakant'} })

```

2. <, >, <=, >=

$lt, $gt, $lte, $gte

```js
db.users.find({ full_name: {  $gte: 'R', $lte: 'T' } } ) // R, T

db.users.find({ age: {  $gte: 24, $lte: 30 } } ) // [24, 30]

db.users.find({ 
    age: {  $gte: 24, $lte: 30 } ,
    full_name: {  $gte: 'M', $lte: 'T' }
} )
```


3. $in, $nin

```js

// if for any document value of full_name is present in the search array [ 'Ilyssa Pawelek', 'Niccolo Phethean', 'Austin Abramson' ]
db.users.find({ full_name: { $in: [ 'Ilyssa Pawelek', 'Austin Abramson', 'Niccolo Phethean' ] }  })

// if for any document value of full_name is not present in the search array [ 'Ilyssa Pawelek', 'Niccolo Phethean', 'Austin Abramson' ]
// full_name value must be present in the document and it must not be in the search array
db.users.find({ full_name: { $nin: [ 'Ilyssa Pawelek', 'Niccolo Phethean', 'Austin Abramson' ] }  })

```

### Logical Operators

1. AND

Two or more conditions and all these conditions should be met

```js
db.users.find({
    $and: [
        // condition 1
        { 
            full_name: { 
                $in: [ 'Ilyssa Pawelek', 'Niccolo Phethean', 'Austin Abramson' ],
            },
        },
        // condition 2
        {
            age: {
                $lte: 30,
                $gte: 20,
            }
        }
        // more conditions if you want
    ]
})

// MongoDB by default assumes AND operation on multiple keys
db.users.find({
    full_name: { 
        $in: [ 'Ilyssa Pawelek', 'Niccolo Phethean', 'Austin Abramson' ] 
    }
    age: {
        $lte: 30,
        $gte: 20,
    }
})

```

2. OR

For two or more conditions, at least one condition should match

```js
db.users.find({
    $or: [
        // condition 1
        { 
            full_name: { 
                $in: [ 'Ilyssa Pawelek', 'Niccolo Phethean', 'Austin Abramson' ] 
            }
        },
        // condition 2
        {
            age: {
                $lte: 30,
                $gte: 28,
            }
        }
        // more conditions if you want
    ]
})
```

3. NOT

For some condition, we can apply NOT of that condition

```js
db.users.find({
    full_name: { 
        $not: {
            $in: [ 'Ilyssa Pawelek', 'Niccolo Phethean', 'Austin Abramson' ] 
        }
    }
})

db.users.find({
    full_name: { 
        $nin: [ 'Ilyssa Pawelek', 'Niccolo Phethean', 'Austin Abramson' ]
    }
})

// All people between age 0-19, 31- 
db.users.find({
    age: { 
        $not: {
            $gte: 20,
            $lte: 30,
        }
    }
})
```


4. NOR

NOT of OR / Opposite of OR

For two or more conditions, All conditions should fail

```js
db.users.find({
    $nor: [
        // condition 1
        { 
            full_name: { 
                $in: [ 'Ilyssa Pawelek', 'Niccolo Phethean', 'Austin Abramson' ] 
            }
        },
        // condition 2
        {
            age: {
                $lte: 30,
                $gte: 28,
            }
        }
        // more conditions if you want
    ]
})
```

### Element Operators

Each key:value pair is considered an element

1. $exists

```js
// All documents where full_name exists
db.users.find({
    full_name: { $exists: true }
})

// All documents where full_name does not exists
db.users.find({
    full_name: { $exists: false }
})

```

2. $type - Type of the element

Type value can be: string, number, boolean

```js
db.users.find({
    name: { $type: 'string' }
})

db.users.find({
    name: { $type: 'number' }
})
```

### Evaluation Operators

1. $mod
```js
db.users.find({
    age: { $mod: [2, 1] }
})
```

2. $regex
```js
db.users.find({
    full_name: { $regex: /^millard /i } // start with and case insensitive
})
```

3. $text

```js

db.blogs.insertOne({
    title: 'PT WEB 05 - Lecture 6',
    content: 'In this lecture we learnt about MongoDB CRUD and Advance operations'
})

db.blogs.insertOne({
    title: 'PT WEB 05 - Lecture 5',
    content: 'In this lecture we learnt Intro to MongoDB'
})
// mongodb intro

db.blogs.insertOne({
    title: 'Trip to Manali',
    content: 'My July trip was very enjoable'
})

// user is searching for 'crud Mongodb advance'
// modify our collection to support this operation
// Create an index on the blog collection, only once

db.blogs.createIndex({ title: 'text', content: 'text' })
// title_text_content_text

db.blogs.find({ $text: { $search: 'mongodb intro' }  })

[
  {
    _id: ObjectId("632c895fabdc8fb2bfab8b83"),
    title: 'PT WEB 05 - Lecture 5',
    content: 'In this lecture we learnt Intro to MongoDB'
  },
  {
    _id: ObjectId("632c8921abdc8fb2bfab8b81"),
    title: 'PT WEB 05 - Lecture 6',
    content: 'In this lecture we learnt about MongoDB CRUD and Advance operations'
  }
]

```

4. $where - javascript find

Custom JS function to figure out whether we should include a document in the search result


```js
const posts = [
  {
    _id: "632c895fabdc8fb2bfab8b83",
    title: 'PT WEB 05 - Lecture 5',
    content: 'In this lecture we learnt Intro to MongoDB'
  },
  {
    _id: "632c8921abdc8fb2bfab8b81",
    title: 'PT WEB 05 - Lecture 6',
    content: 'In this lecture we learnt about MongoDB CRUD and Advance operations'
  }
]


let search = 'crud mongodb';

db.blogs.find({
    $where: function () {

        if (this.title.search('CRUD')) {
            return true;
        }

        if (this.content.search('CRUD')) {
            return true;
        }

        return false;
    }
})
```

### Array Operators

These operators will work only on array elements

```js
{
    title: '',
    content: '',
    likedUserIds: [12, 45, 32, 89]
}
```

1. $all

All elements in the array should be present in the compared array
```js

db.blogs.find({
    likedUserIds: {
        $all: [12, 45] // true
        $all: [12, 78] // false
    }
})

```

2. $size

Matches the documents where the array size matches the provided value

```js
db.blogs.find({
    likedUserIds: {
        $size: 4 // true
    }
})

```

3. $elemMatch

If there is at least one element that matches the given conditions
```js

db.blogs.find({
    likedUserIds: {
        $elemMatch: {  // false
            $gte: 12,
            $lte: 32
        }
    }
})

```


## Pagination

db.users.find().count()
db.users.countDocuments({ name: { $ne: 'Umakant'} })

db.users.find().limit(10)

db.users.find().skip(3)

db.users.find().sort()
