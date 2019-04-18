'use strict';
var tw = require('./twilio.js');
var dataService = require('../services/dataService.js');
var surveyService = require('../services/surveyService');


// localhost:3000/smsTo/7576857417/testing 123
exports.smsTo = function(req, res){
	res.json({ message: 'smsTo result: ' + tw.sms.to(req.params.phone, req.params.message)});
};


// checks the reply from the cell phones
exports.smsInputAnalizer = function(req, res){
    //console.dir(req);
	var message = 'start',//req.body.Body,
        phone = '+17573188659',//req.body.From,
        isBroadcast = false,
        output = '';

	switch (message.toLowerCase()){
			case 'start':
                var question = surveyService.getNextQuestion(phone);
                console.log('question: ');
                console.dir(question);
                //tw.sms.to(phone, question.details);
                
				//tw.sms.broadcast(phone, question.details);
                try{
				
                    output = question[0].details;// surveyService.startSurvey(phone);
                
                }catch(err){ 
                    output = 'Thanks for your answers';
                }
            
				break;
			default:
                var question = surveyService.getNextQuestion(phone);
				//tw.sms.broadcast(phone, question.details);
				break;
	}

	res.send('<Response><Message>' + output + '</Message></Response>');
	return;
}

exports.smsBroadcast = function(req, res){
	var msgFrom = req.body.From;
 	var msgBody = req.body.Body;
  tw.sms.broadcast(msgFrom, msgBody);

 	res.send(`
 		<Response>
 			<Message>

 			</Message>
 		</Response>
 	`)
};
