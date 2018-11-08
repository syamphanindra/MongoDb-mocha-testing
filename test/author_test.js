const test = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');
describe('Nesting records',function(){
//authors is used to remove all records pluralize form
  beforeEach(function(done){
    mongoose.connection.collections.authors.drop(function(){
      done();
    });
  });

  it('creating a author with nested documents',function(done){
      var pat = new Author({
        name: "Syam Phanindra",
        books: [{title:'Name of the wind',pages:400}]
      });
      pat.save().then(function(){
        Author.findOne({name:"Syam Phanindra"}).then(function(result){
        assert(result.books.length===1)
      });
      done();
    });
  });


    it('Add Book to author after it is created',function(done){
        var pat = new Author({
          name: "Syam Phanindra",
          books: [{title:'Name of the wind',pages:400}]
        });
        pat.save().then(function(){
          Author.findOne({name:"Syam Phanindra"}).then(function(result){
          result.books.push({title:"Wise man's Fear",pages:590});
          result.save().then(function(record){
            assert(record.books.length === 2);
          });
        });
        done();
      });
    });
});
