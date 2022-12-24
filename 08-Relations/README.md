
# Data Relations

Board Link: https://excalidraw.com/#json=_vJWGoHe2BuYM0Ry5pu6r,KNB7kbU1HhW76FhQjaLD6Q


## Types of Relationships

### One:Many or Many:One

```js

UserSchema = {
    _id:        ObjectId(),
    name:       String,
    email:      String,
    password:   String,
    avatar:     String,
}


Post = {
    _id:        ObjectId(),
    title:      String,
    content:    String,
    user:       {
        name:       String,
        avatar:     String,
        _id:        ObjectId(),
    },
}
```

### One:One

### Many:Many
