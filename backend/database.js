const mongoose = require('mongoose');
const URI = 'mongodb+srv://andrea:1234@andreagomesavg.wbvhx.mongodb.net/?retryWrites=true&w=majority&appName=Andreagomesavg';

mongoose.connect(URI).then(()=> console.log('DB connected')).catch(err=> console.error(err));
module.exports = mongoose;
