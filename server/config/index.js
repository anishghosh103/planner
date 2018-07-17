const config = {};

config.port = 3003;
config.secret = 'asdlkj123u890asd01u9n20ausd';
config.dataKey = 'eyJhbGciOiJIUzI';
// TODO: change the 'baseUrl'
config.baseUrl = `http://localhost:${config.port}`;

config.db = {
  uri: 'mongodb://127.0.0.1:27017/planner'
};



module.exports = config;