## Usage

Define your models, for example

```
App.models.project = {
  mongooseSchema: {
    name: { type: String },
    date: { type: Date, default: Date.now, private: true }
  },
  //this will be called before registering the Schema
  mongoosePremodel: function(Schema) {
    Schema.path('name').set(function(v) {
      return v.toUpperCase();
    });
    Schema.pre('save').set(function(next) {
      // do something
      next();
    });
  }
  instanceMethod: {
    doSomething: function() {}
  }
};
```

When you're done defining them, add `App.load('mongoose/model');` to your app.js.
If you pass an additional string, for example `App.load('mongoose/model', 'mongodb://localhost/my_database);`, mongoose will connect to that database.
Otherwise it will connect to the database defined in `App.configuration.mongoose.url`

Every method from `instanceMethods` will be added as instance methods to the schema.

In addition to mongoose, you can define `private` on attributes. This will hide these attributes when callig `toJSON`.
Useful for sensitive information
