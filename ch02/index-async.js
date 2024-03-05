const fsPromises = require('fs').promises
 const path = require('path');
 const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8')
        console.log(data)

        // to delete 
        // await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt')) 
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data)

        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you')

        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'),path.join(__dirname, 'files', 'promiseComplete.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf-8')
        console.log(newData)
        } catch (err) { 
            console.error(err)
         } } 
        console.log('Hello......')
        fileOps()
        // utf-8 is by default here 
        // fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),'Nice', (err, data) => { 
        // if(err) throw err
        // console.log('Write Complete')
        // })
        // fs.appendFile(path.join(__dirname, 'files', 'reply.txt'),'Work', (err, data) => {
        // if(err) throw err
        // console.log('Append Complete')
        // fs.rename(path.join(__dirname, 'files', 'reply.txt'),path.join(__dirname, 'files', 'Newreply.txt'), (err, data) => { 
        // if(err) throw err
        // console.log('Rename Complete')
        // }) // }) 
        process.on('uncaughtException', err => { console.error(`There was an error': ${err}`)
        process.exit(1) 
    })