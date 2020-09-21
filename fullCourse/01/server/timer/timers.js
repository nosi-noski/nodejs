const fs = require('fs')

console.log('start')

fs.readFile(__filename, (err, content) => {
    console.log('readFile')
})

setImmediate(()=>{
    console.log('setImmediate') 
})

new Promise(resolve =>{
    console.log('promise created') 
    resolve('promise then')

}).then( value => console.log(value) )

process.nextTick(()=>{
    console.log('nextTick1')
})
console.log('end')
