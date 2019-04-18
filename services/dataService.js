var ld = require('lodash');
var fs = require('fs');

exports.activePlayers = function(){
  var people = require('../controllers/config.json');
  var active = people.filter(function(person){
    return person.status == "active";
  });

  return active;

};

exports.updatePlayerStatus = function(status, phone){
  var people = require('../controllers/config.json');
	var optingOutPhone = (phone.indexOf('+') == -1 ) ? '+1' + phone : phone,
			updatedSubscribers = [],
			optingOut = ld.filter(people, person => person.phone == optingOutPhone);

	optingOut[0].status = status;

	people.forEach(function(person){
		(person.phone != optingOutPhone)
			? updatedSubscribers.push(person)
			: updatedSubscribers.push(optingOut[0]);
	});

	fs.writeFile('./controllers/config.json', JSON.stringify(updatedSubscribers), 'utf8', function(){
		return "success";
	});

  return "success";

};

exports.listActivePlayers = function(){
  var people = require('../controllers/config.json');
  var output = "",
      i = 1;

  activePeople = people.filter(function(person){
    return person.status == "active";
  });

  activePeople.forEach(function(person){
    output += i + ': ' + person.name + ', ' + person.phone + '\n';
    i++;
  });

  return output;
}
