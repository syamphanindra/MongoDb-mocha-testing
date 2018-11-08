const mongoose = require('mongoose');

//Mongoose ES6 promise
mongoose.Promise = global.Promise;
//connect to mongoose
before(function(done){
mongoose.connect('mongodb://localhost/testaroo');
mongoose.connection.once('open',function(){
  console.log("Connection has been made, now make fireworks.......");
  done();
}).on('error',function(error){
  console.log("Connection error:",error);
});
});

//we need to pluralize the mariochars i.e is pluralize the model form
beforeEach(function(done){
  mongoose.connection.collections.mariochars.drop(function(){
    done();
  });
});
