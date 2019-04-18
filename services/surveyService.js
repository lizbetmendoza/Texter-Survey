const path = require('path');

var ld = require('lodash'),
    fs = require('fs'),
    survey1 = require('../data/survey1.json'),
    surveyProgress = require('../data/surveyProgress.json');


_getDateTime = function() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

_updateSurveyProgress = function(phone){
    var updatedProgress = [],
        userProgress = ld.filter(surveyProgress, progress => progress.phone == phone),
        isNewUser = false;
    
    if (userProgress == ''){
        isNewUser = true;
        userProgress[0] = {
            'phone' : phone,
            'question' : 0, // array of questions starts at 0
        };
    } else{
        userProgress[0].question += 1; // this is the number of the next question to be send
    }
    
    surveyProgress.forEach(function(progress){
        if ((progress.phone == phone) || (isNewUser)){
            isNewUser = false;
            updatedProgress.push(userProgress[0]);
        } else {
            updatedProgress.push(userProgress[0]);
        }
            
	});
    
    if (surveyProgress == ''){
        updatedProgress.push(userProgress[0]);
    }
    
fs.writeFile(path.resolve('./data/surveyProgress.json'), JSON.stringify(updatedProgress), function (err) {
  if (err) return console.log(err);
  console.log('before saving: ' + JSON.stringify(updatedProgress));
  console.log('writing to ../data/surveyProgress.json');
console.dir(updatedProgress);
});    
    /*
    
	fs.writeFile('../data/surveyProgress.json', JSON.stringify(updatedProgress), 'utf8', function(){
		console.log('cabo');
	});*/

    console.log('userProgress');
    console.dir(userProgress[0]);
  return userProgress[0].question;
    
};

exports.getNextQuestion = function(phone){
    
    console.log('getNextQuestion: ' + phone + ', ' + _getDateTime());
    
    var lastQuestion = _updateSurveyProgress(phone) + 1;
    console.info('lastQuestion: ', lastQuestion);
    
    var question = ld.filter(survey1, question => question.number == lastQuestion);
    
    console.info('getNextQuestion question: ', question);
    
    if (question != null){
        console.log('getNextQuestion if return');
        return question;
    }
    
    return null;
}