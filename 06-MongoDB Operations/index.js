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
  
  
let search = 'CRUD mongodb';
  
let result = posts.filter(blog => {
    // return true to include in the result
  
    let words = search.split(' '); // ['crud', 'mongodb']

    let exists = words.find(word => {
        // console.log(word)
        
        if (blog.title.search(word)) {
            return true;
        }

        if (blog.content.search(word)) {
            return true;
        }

        return false;
    })

    // console.log(exists);

    if (exists) {
    return true;
    }
    
    return false;

    // return false if we don't want to include this in the result
})

// console.log(posts[0].title.search(new RegExp(/crud/i)))
console.log(result)