// Create a new GitHub repository, named Flashcard-Generator or something similar. Clone this to your local drive.
// Create a new file named BasicCard.js:
// This file should define a Node module that exports a constructor for creating basic flashcards, e.g.: module.exports = BasicCard;
// The constructor should accept two arguments: front and back.
// The constructed object should have a front property that contains the text on the front of the card.
// The constructed object should have a back property that contains the text on the back of the card.

//global and required variabls
var inquirer = require("inquirer";)


var correct;
var wrong;


//constructor
function flashCard(front, back) {
	this.front = [];
	this.back = []; 

	this.printQuestion = function() {
		console.log(front);
	};

	this.printAnswer = function() {
		console.log(back);
	};
	this.start = function() {

		inquirer.prompt([
			{
				name: "Question1",
				message: this.back[0]
			}, 
			{	name: "Question2",
				message: this.back[1]
			} 
		// {	name: "Question3",
		// 	message: " "
		// }, 
		// {	name: "Question4",
		// 	message: " "
		// }, 
		// {	name: "Question5",
		// 	message: " "
		// }, 
		// {	name: "Question6",
		// 	message: " "
		// }, 
		// {	name: "Question7",
		// 	message: " "
		// }
		]).then(function(answers) {

			var flashQuiz = new flashCard(answers.Question1, answers.Question2);

			flashQuiz.printResults();
		})
	}

};


var Question1 = new flashCard("What is your name?", "Sofia");

var Question2 = new flashCard("What is your dog's name?", "Ella");


//prototypes - should confirm answers

flashCard.prototype.printResults = function() {
	for (var i = 0; i < flashQuiz.length; i++) {
		if(this.back == answers.Question1) {
			console.log("Your Answer Was Correct!");
			correct++;
		}else{
			console.log("Your Answer Was Wrong...")
			wrong++
		}
	}
	var percent = ((flashQuiz.length - wrong)/ flashQuiz.length)*100
	console.log("You got " + percent + "% on the quiz!");
}







