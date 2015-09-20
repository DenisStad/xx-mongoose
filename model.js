/*
 * ## Usage
 *
 * Define your models, for example
 *
 * ```
 * App.models.project = {
 *   mongooseSchema: {
 *     name: { type: String },
 *     date: { type: Date, default: Date.now, private: true }
 *   },
 *   mongoosePremodel: function(Schema) {
 *     Schema.path('name').set(function(v) {
 *       return v.toUpperCase();
 *     });
 *     Schema.pre('save').set(function(next) {
 *       // do something
 *       next();
 *     });
 *   },
 *   instanceMethod: {
 *    doSomething: function() {}
 *   }
 * };
 * ```
 * 
 * When you're done defining them, add `App.load('mongoose/model');` to your app.js.
 * If you pass an additional string, for example `App.load('mongoose/model', 'mongodb://localhost/my_database);`, mongoose will connect to that database.
 * Otherwise it will connect to the database defined in `App.configuration.mongoose.url`
 *
 * Every method from `instanceMethods` will be added as instance methods to the schema.
 *
 * In addition to mongoose, you can define `private` on attributes. This will hide these attributes when callig `toJSON`.
 * Useful for sensitive information
 * 
 */

var mongoose = require('mongoose');
var jsonSelect = require('mongoose-json-select');

exports = module.exports = function(App, connectURL) {
  
  mongoose.connect(connectURL || App.configuration.mongoose.url);

  var Schema = mongoose.Schema;
  ObjectId = Schema.ObjectId;

  for (var name in App.models) {
    if (App.models[name].mongooseSchema) {
      var Schema = new Schema(App.models[name].mongooseSchema);

      for (var a in App.models[name].mongooseSchema) {
        if (App.models[name].moongoseSchema[a].private) {
          Schema.plugin(jsonSelect, '-' + a);
        }
        Schema.methods[m] = App.models[name].instanceMethods[m];
      }

      for (var m in App.models[name].instanceMethods) {
        Schema.methods[m] = App.models[name].instanceMethods[m];
      }

      if (App.models[name].mongoosePremodel) {
        App.models[name].mongoosePremodel(Schema);
      }

      App.models[name].Model = mongoose.model(name, Schema);

      //TODO: hide fields from toJSON
    }
  }
};
