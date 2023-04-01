
# Relation in Data

https://excalidraw.com/#json=1Ev6ZNd7_gDXH7DMujb8P,ExAZ504SCsZhWOJY7bhmRQ

NoSQL - Non-relational database

Blog

- User
    - _id
    - name
    - email
    - password
    - picture
    - createdAt
    - updatedAt

- Post - this must have info about the author
    - _id
    - title
    - content
    - author : details of the user who added this post
        - name, picture, _id
    - createdAt
    - udpatedAt

- Comment - document must have info about the comment author and the post on which the comment is added
    - _id
    - body
    - author : details of the user who added the comment
        - name, picture, _id
    - post : details of the post where the comment was added
        - _id, title
    - createdAt
    - updatedAt

## Relationships: 

### One-Many or Many-One
### One-One
### Many-Many
