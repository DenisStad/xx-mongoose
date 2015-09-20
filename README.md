## Usage

Define your models, for example

```
App.models.project = {
  mongooseSchema: {
    name: { type: String },
    date: { type: Date, default: Date.now }
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
};
```

When you're done defining them, add `App.load('mongoose/model');` to your app.js.
If you pass an additional string, for example `App.load('mongoose/model', 'mongodb://localhost/my_database);`, mongoose will connect to that database.
Otherwise it will connect to the database defined in `App.configuration.mongoose.url`
