// Create a new GitHub repository, named Flashcard-Generator or something similar. Clone this to your local drive.
// Create a new file named BasicCard.js:
// This file should define a Node module that exports a constructor for creating basic flashcards, e.g.: module.exports = BasicCard;
// The constructor should accept two arguments: front and back.
// The constructed object should have a front property that contains the text on the front of the card.
// The constructed object should have a back property that contains the text on the back of the card.


var fs = require("fs");

module.exports = BasicFlashCard;

//constructor
function BasicFlashCard(front, back) {
	this.front = front;
	this.back = back; 

	this.createQuestion = function() {
		var data = {
			front: this.front,
			back: this.back,
			type: "basic", 
		};

		fs.appendFile('log.txt', JSON.stringify(data) + ';', "utf8", function(error) {
			if(error) {
				console.log(error);
			}
		});
	};
};
