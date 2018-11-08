const assert = require('assert');
const MarioChar = require('../models/mariochar')
//to run test folder files

describe('Find one record from the db',function()
{
  var char;
  //**************creating a record example***************************************
  beforeEach(function(done){
  char = new MarioChar({
      name: 'Mario',
      weight: 50
    });
    //isNew returns false if it is created but not yet saved to debug
    //and it returns true if it is saved in db
    //.save is asynchronouse request
    char.save().then(function(){
      assert(char.isNew === false);
      done();
    });
  });
//*******************finding record example ***************************************
  it('finding record of created one',function(done){
    MarioChar.findOne({name:"Mario"}).then(function(result){
      assert(result.name === "Mario");
      done();
    });//find it will return all the records with name "Mario"
    //if we use findOne({name:"Mario"}) it will return the first record with name "Mario"
  });

  it('finding record by id',function(done){
    MarioChar.findOne({_id:char._id}).then(function(result){
      assert(result._id.toString() === char._id.toString());
      done();

    })
  });

  //**********************Deleting example******************************************
//char.remove will remove the instance that already found and saved in char variable
//MarioChar.remove will remove entire collection data that matches the condition
//eg: MarioChar.remove({name:"Mario"});
//MarioChar.findOneAndRemove({condition}) will remove first matched condition record

  it('deleting a record from the db',function(done){

    MarioChar.remove({name:"Mario"}).then(function(){
      MarioChar.findOne({name:"Mario"}).then(function(result){
        assert(result === null);
        done();
      });
    });
  });

  //**********************Updating record example***********************************
  //char.update() it is called on single instance that is already found
  //MarioChar.update({condition},secondarg) it is update all records with a matching condition
  //secondarg is object that is updated
  //similary MarioChar.findOneAndUpdate({condition},secondarg) it will update first
  //matched condition
  //if we dont want any condition the could be empty MarioChar.update({},secondarg) so it applied to all
  it('Update one record in db',function(done){
    MarioChar.findOneAndUpdate({name:"Mario"},{name:"Syam"}).then(function(result){
      assert(result.name === char.name);
      MarioChar.findOne({_id:char._id}).then(function(result1,done){
        assert(result1.name === char.name);
      });
      done();
    });
  });
  //***********************Update Operators *******************************************
  //if we dont want any condition the could be empty MarioChar.update({},secondarg) so it applied to all
  //similary {$inc:{weight:10}} or {$inc:{weight:-130}}
  //documentation for the Operators is https://docs.mongodb.com/manual/reference/operator/update/
  it('increment the weight by one in db',function(done){
    MarioChar.update({},{$inc:{weight:1}}).then(function(){
      MarioChar.findOne({name:"Mario"}).then(function(result){
        assert(result.weight===51);
        done();
      });
    });
  });

});
