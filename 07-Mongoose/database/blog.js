
import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({ // Class
    
})

const blogModel = mongoose.model('Blog', blogSchema, 'blogs')

export default blogModel;