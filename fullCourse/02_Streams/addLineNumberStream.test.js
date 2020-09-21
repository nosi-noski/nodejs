const fs = require('fs');
const stream = require('stream');

const AddLineNumberStream = require('./AddLineNumberStream')

const fileIn = fs.createReadStream(
    __filename, 
    { highWaterMark:100 }
);
const addLineNumber = new AddLineNumberStream();
const fileOut = fs.createWriteStream(`${__filename}.out`);

stream.pipeline(
    fileIn, 
    addLineNumber, 
    fileOut, 
    (err) => {
        if( err ){
            console.log(err);
        } else {
            console.log("done");
        }
});