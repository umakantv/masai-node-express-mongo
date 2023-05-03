
# Intro to mongodb

```
show dbs
use <db_name> // use pt-web-10

db.createCollection('students')
```

```js
db.students.insertOne({
  name: "Abhishek",
  dateOfBirth: "2000-12-12",
  gender: "male",
  graduated: false,
  score: 89.3,
  courses: ["backend", "react", "javascript", "html", "css"],
  preferences: { timeSlot: "morning" },
});

db.students.find();

db.students.updateOne(
  { _id: ObjectId("6452880f81bb9af2e2849ed4") },
  {
    $set: {
      name: "Varun Talwar",
      dateOfBirth: "1998-10-02",
      gender: "male",
      graduatedAt: "2022-12-12",
      score: 95,
      courses: ["backend", "react", "javascript", "html", "css"],
      preferences: {},
    },
  }
);

db.students.deleteOne({ _id: ObjectId("6452883681bb9af2e2849ed5") });
```
