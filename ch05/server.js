const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };

// initialize object console.log('welcome');
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => {
    logEvents(msg, fileName);
})
const PORT = process.env.PORT || 3000;
const serverFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(filePath, !contentType.includes('image') ? 'utf-8' : '');
        const data = contentType === 'application/json'
            ? JSON.parse(rawData)
            : rawData;
        response.writeHead(filePath.includes('404.html') ? 404 : 200, { 'Content-type': contentType })
        response.end(contentType === 'application/json' ? JSON.stringify(data) : data);
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}\t${err.message}`, 'errLog.txt')
        response.statusCode = 500;
        response.end();
    }
}
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')
    const extension = path.extname(req.url);
    let contentType;
    switch (extension) {
        case '.css': contentType = 'text/css';
            break;
        case '.js': contentType = 'text/javascript';
            break;
        case '.json': contentType = 'text/json';
            break;
        case '.jpg': contentType = 'image/jpg';
            break;
        case '.png': contentType = 'text/png';
            break;
        case '.txt': contentType = 'text/plain';
            break;
        default: contentType = 'text/html'
    }
    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // makes .html extension not required in the browser 
    if (!extension && req.url.slice(-1) !== '/') {
        filePath += '.html'
    }
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        // serve the file 
        serverFile(filePath, contentType, res);
    } else {
        //404 
        // 301 redirect 
        // console.log(path.parse(filePath));
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                // 404 
                serverFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }
})
server.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
})
