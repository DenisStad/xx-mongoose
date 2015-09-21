var mongoose = require('mongoose');
exports = module.exports = function(App, connectURL) {
  mongoose.connect(connectURL || App.configuration.mongoose.url);
};
