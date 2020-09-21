
const os = require('os');
const stream = require('stream');


class AddLineNumberStream extends stream.Transform {
    constructor(options){
        super(options);
        this.lineNumber = 1;
        this.lastLineNotCompleted = false;
        this.waitSecondPartOfLine = false;

    }
    _transform(chunk, encoding, callback){

        const str = chunk.toString('utf-8');
        const lines = str.split(os.EOL);

       

        if( !str.endsWith(os.EOL) ){

            this.lastLineNotCompleted = true;
        } 

        let _out = '';
      
        lines.forEach( (element, i, arr) => {
            if( this.lastLineNotCompleted && !this.waitSecondPartOfLine && i === arr.length - 1 ) {
                _out += `${this.lineNumber++}. ${element}`;
                this.lastLineNotCompleted = false;
                this.waitSecondPartOfLine = true;

            } else if( this.waitSecondPartOfLine && i === 0 ) {
                _out += `${element}${os.EOL}`;
                this.waitSecondPartOfLine = false;
            }else{
                _out += `${this.lineNumber++}. ${element}${os.EOL}`;
            }

        });
        console.log(_out)
        callback(null, Buffer.from(_out));
    }
}

module.exports = AddLineNumberStream;