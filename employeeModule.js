// Import the underscore module
var _ = require('underscore');
var colors = require('colors');


var data = [
  {id: 1, firstName: "John", lastName: "Smith"},
  {id: 2, firstName: "Jane", lastName: "Smith"},
  {id: 3, firstName: "John", lastName: "Doe"}
]


// Given an id, return the JavaScript object with the corresponding id.
// If no object is found, return undefined
function lookupById(id){
  // console.log(`Lookup by id (${id})`.red);
  return _.findWhere(data, {id:id});
}


// Return atn array of JavaScript objects from teh data whose lastName matches
// the specified object.  If there is no match, return an empty array.
function lookupByLastName(lastName){
  // console.log(`Lookup by last name (${lastName})`.red)
  return _.filter(data, {lastName: lastName});

}

// Add en employee to the data array using the firstName and lastName arguments.
// The id for the new employee should be one more than the current max id in the array.
function addEmployee(firstName, lastName){
  // Find the value with the highest id, isolate the id attribute, and increment by 1
  let id = _.max(data, (value) => value.id)['id']+1;
  // console.log(`Adding employee ${firstName} ${lastName}`.red);
  data.push({id, firstName, lastName});
  return id;
}

// Export the above functions
module.exports = {
  lookupById,
  lookupByLastName,
  addEmployee
};
