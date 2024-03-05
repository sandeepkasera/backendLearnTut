const fs = require('fs');

// fs.mkdir('./new',(err) => {

//     if (err) throw err;

//     console.log('Directory created');

// })

 

 

if (!fs.existsSync('./new')) {

    fs.mkdir('./new',(err) => {

            if (err) throw err;

            console.log('Directory created');

        })

}

 