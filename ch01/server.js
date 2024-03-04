console.log('HI');
// console.log(global); 
const os = require('os');
const path = require('path');
const math = require('./math');
const { subtract } = require('./math')
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(__dirname);
console.log(__filename);
console.log('dirname',
path.dirname(__filename))
console.log('basename', path.basename(__filename))
console.log('extname', path.extname(__filename))
console.log('parse', path.parse(__filename))
console.log(math.add(2,3));
console.log(subtract(2,3));
