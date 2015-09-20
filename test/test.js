var xerxes = require('xerxes');
var App = xerxes();
var should = require('should');

App.load('models/test');
App.load('../model', 'mongodb://localhost/xxmongoose');

App.models.test.Model.create({
  name: "Test 1",
  number: 1,
  additional: "some"
}, function(err, instance) {
  if (err) throw err;

  instance.name.should.equal("Test 1");
  instance.number.should.equal(1);
  instance.should.not.have.property('additional');

  console.log("Test passed");
  process.exit();
});
