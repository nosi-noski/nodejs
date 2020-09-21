const fs = require('fs');

const fileIn = fs.createReadStream(__filename, {highWaterMark: 100});
const fileOut = fs.createWriteStream(__filename + ".out", {highWaterMark: 100})

fileIn.on('data', data => {
    const r = fileOut.write(data);
    console.log(r)

    if( r === false ){
        fileIn.pause();
        fileOut.once('drain', () => {
            console.log('drain')
            fileIn.resume()
        })
    }
})

fileIn.on('end', () => {
    fileOut.end()
})
//fileIn.pipe(fileOut);