var BasicFlashCard = require('./basicflashcard.js');

var ClozeFlashCard = require('./cloze-flashcard.js');

var inquirer = require("inquirer");

var fs = require('fs');


inquirer.prompt([{
	name: "command", 
	message: "Please select an option.",
	type: "list",
	choices: [{
		name: 'add-flashcard'
	}, {
		name: 'show-cards'
	}]
}]).then(function(answer) {
	if(answer.command === 'add-flashcard') {
		addCard();
	} else if (answer.command === 'show-cards') {
		showCards();
	}
});
	

var addCard = function() {
	inquirer.prompt([{
		name: 'cardType', 
		message: 'What kind of flashcard would you like to create?', 
		type: 'list',
		choices: [{
			name: 'basic-flashcard', 
		}, {
			name: 'cloze-flashcard'
		}]
	}]).then(function(answer) {
		if(answer.cardType === 'basic-flashcard') {
			inquirer.prompt([{
				name: 'front',
				message: 'What is the question?',
				validate: function(input) {
					if(input == ''){
						console.log('Please provide a question');
						return false;
					} else {
						return true
					}
				}
			}, {
			name: 'back', 
			message: 'What is the answer?', 
			validate: function(input) {
				if (input === '') {
					console.log( 'Please provide an answer');
					return false;
				} else {
					return true;
				}
			} 
		}]).then(function(answer) {
			var newBasic = new BasicFlashCard(answer.front, answer.back);
			newBasic.createQuestion();
			whatsNext();
		});

		} else if (answer.cardType === 'cloze-flashcard') {
			inquirer.prompt([{
				name: 'text', 
				message: 'What is the full text?', 
				validate: function(input) {
					if (input === '') {
						console.log('Please provide the full text');
						return false;
					} else {
						return true;
					}
				}
			}, {
				name: 'cloze', 
				message: 'What is the cloze portion?', 
				validate: function(input) {
					if(input === '') {
						console.log('Please provide the full text');
						return false;
					}else {
						return true;
					}
				}
			}]).then(function(answer) {
				var text = answer.text;
				var cloze = answer.cloze;

				if (text.includes(cloze)) {
					var newCloze = new ClozeFlashCard(text, cloze); 
					newCloze.createQuestion();
					whatsNext();
				} else {
					console.log('The cloze portion you provided is not foun in the full text. Please try again.');
					addCard();
				}
			});
		}
	});
};

var whatsNext= function() {
	inquirer. prompt([{
		name: 'nextAction',
		message: 'What would you like to do next?', 
		type: 'list',
		choices: [{
			name: 'create-new-card'
		}, {
			name: 'show-cards'
		}, {
			name: 'nothing'
		}]
	}]).then(function(answer) {
		if (answer.nextAction === 'create-new-card') {
			addCard();
		} else if (answer.nextAction === 'show-cards') {
			showCards();
		} else if (answer.nextAction === 'nothing') {
			return;
		}
	});
};

var showCards = function() {
	fs.readFile('./log.txt', 'utf8', function(error, data) {
		if (error) {
			console.log('Error ocurred: ' + error);
		}
		var questions = data.split(';');
		var notBlank = function(value) {
			return value;
		};
		questions = questions.filter(notBlank);
		var count = 0;
		showQuestion(questions, count);
	});
};

var showQuestion = function(array, index) {
	question = array[index];

	var parsedQuestion = JSON.parse(question);
	var questionText;
	var correctResponse;

	if(parsedQuestion.type === 'basic') {
		questionText = parsedQuestion.front;
		correctResponse = parsedQuestion.back;
	} else if (parsedQuestion.type === 'cloze')
 	{
 	questionText = parsedQuestion.clozeDeleted;
 	correctResponse = parsedQuestion.cloze;
 	}
 	inquirer.prompt([{
 		name: 'response', 
 		message: questionText
 	}]).then(function(answer) {
 		if (answer.response === correctResponse) {
 			console.log('Correct!');
 			if (index < array.length -1) {
 				showQuestion(array, index +1)
 			}
 		} else {
 			console.log('Wrong!');
 			if(index < array.length - 1) {
 				showQuestion(array, index + 1);
 			}
 		}
 	});
};