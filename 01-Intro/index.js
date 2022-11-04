
console.log('Hello World')

// import randomInt from './random'

// 1. User defined modules
// const randomModule = require('./random')
// const {randomInt} = require('./random')

import axios from 'axios'
import {randomInt } from './random.js'

// 2. Core Modules
// const fs = require('fs');
import fs from 'fs'

// 3. Third party modules
// const moment = require('moment');
import moment from 'moment'
// const axios = require('axios')


const date = moment().add(4, 'weeks').format('DD MMM YYYY');

console.log(date);


export async function getPosts() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
        console.log(res.data)
    })
}



const content = fs.readFileSync('./random.js', {
    encoding: 'utf-8'
})

// console.log(content)


console.log(randomInt(100, 300))
// console.log(randomModule.greeting('PT WEB 6'))