const fs = require('fs');

const path = require('path');

 

// fs.readFile('./files/starter.txt', 'utf-8', (err, data) => {

//     if(err) throw err;

//     // console.log(data); it reads buffer data if utf-8 is not mentioned

//     console.log(data);

// })

 

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {

    if(err) throw err;

    // console.log(data); it reads buffer data if utf-8 is not mentioned

    console.log(data);

})

 

console.log('Hello......');

 

// utf-8 is by default here

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),'Nice', (err, data) => {

    if(err) throw err;

    console.log('Write Complete');

})

 

fs.appendFile(path.join(__dirname, 'files', 'reply.txt'),'Work', (err, data) => {

    if(err) throw err;

    console.log('Append  Complete');

 

    fs.rename(path.join(__dirname, 'files', 'reply.txt'),path.join(__dirname, 'files', 'Newreply.txt'), (err, data) => {

        if(err) throw err;

        console.log('Rename  Complete');

    })

 

})

process.on('uncaughtException', err => {

    console.error(`There was an error': ${err}`);

    process.exit(1)

})