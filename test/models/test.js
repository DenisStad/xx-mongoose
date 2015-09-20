exports = module.exports = function(App) {
  App.models.test = {
    mongooseSchema: {
      name: { type: String },
      number: { type: Number }
    }
  }
};
