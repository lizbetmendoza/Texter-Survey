var dataService = require('../services/dataService.js');

exports.sms = {
	vars : {
		accountSid : 'AC08fc2f89580fe009a7c698ff4be41138', //process.env.ACCOUNT_SID
		authToken : 'a7f873e82b3b73d05b7d24c66d2a1c60',  //process.env.AUTH_TOKEN
		twilioPhone : '+17572555412',//
		adminName: 'Igor Vargas (subzero)',
		activePlayers: dataService.activePlayers()
	},

	_sendText: function(phone, message){

		var twilio = require('twilio'),
				client = new twilio(this.vars.accountSid, this.vars.authToken),
				output = "";

			client.messages.create({
				to: phone,
				from: this.vars.twilioPhone,
				body: message
			}, function (err, data){

				if (err) return err;
				return data;

			});
	},

	to: function(phone, message){
			return this._sendText(phone, message, function(err, data){
				if (err) return reject(err)
				resolve(data);
				return 'success';
			});
	},

	all: function(message){
		var self = this;
		message = this.vars.adminName + "\r\n" + message;

		self.vars.activePlayers.forEach(function(person){
			var x = self._sendText(person.phone, message);
		})

		return "success";

	},

	broadcast: function(sender, message){
		var self = this;
		var senderPerson = null;

		self.activePlayers.forEach(function(person){
			if (sender == person.phone){
					senderPerson = person;
			}
		});

		self.vars.activePlayers.forEach(function(person){
			if (sender != person.phone){
				var details =  senderPerson.name + " (" + senderPerson.nick + ")\r\n"  + message;
				var x = self._sendText(person.phone, details);
			}

		})
		return "success";
	}
}
