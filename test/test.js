var xerxes = require('xerxes');
var App = xerxes();
var should = require('should');

App.load('models/test');
App.load('../connect', 'mongodb://localhost/xxmongoose');
App.load('../model');

App.models.test.Model.create({
  name: "Test 1",
  number: 1,
  additional: "some"
}, function(err, instance) {
  if (err) throw err;

  try {
    instance.name.should.equal("Test 1");
    instance.number.should.equal(1);
    instance.should.not.have.property('additional');
    instance.should.have.property('id');
    instance.should.have.property('_id');
    console.log("Test passed");
  } catch (e) {
    console.log(e);
  }

  process.exit();
});

