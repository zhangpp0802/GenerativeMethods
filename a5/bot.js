class MoodBot {
	constructor() {
		this.drinkAmount = 0
		this.maxCoffee = 10

		this.moodType = "happy";
		this.moodAdv = "fucking";
		this.moodAdj = "precious";
		this.moodNoun = "bird";
		this.moods = "😀";

		this.barName = "Kumiko";
		this.cocktails = "Mojito";
		this.icons = "🍹";

		this.grammar = tracery.createGrammar(moodGrammar)
		this.grammar.addModifiers(baseEngModifiers)
		// console.log("A type of coffee:", this.grammar.flatten("#coffeeType#"))
	}

	respondTo(s) {
		console.log("User said", s)
		// return "<img src='https://media.tenor.com/images/eff22afc2220e9df92a7aa2f53948f9f/tenor.gif'></img>"

		

		if (s.toLowerCase().includes("drink")) {
			this.barName = this.grammar.flatten("#barName#")
			this.cocktails = this.grammar.flatten("#cocktails#")
			this.icons = this.grammar.flatten("#icons#")
			this.post(`How about go to ${this.barName} to have a ${this.cocktails} ${this.icons}`)
			return ""
		}

		if (s.toLowerCase().includes("another")) {
			this.barName = this.grammar.flatten("#barName#")
			this.cocktails = this.grammar.flatten("#cocktails#")
			this.icons = this.grammar.flatten("#icons#")
			this.post(`How about go to ${this.barName} to have a ${this.cocktails} ${this.icons}`)
			return ""
		}



		// Brew new coffee
		if (s.toLowerCase().includes("how")) {

			// Create new values
			console.log("in how are you")
			this.moodType = this.grammar.flatten("#moodType#")
			this.moodAdv = this.grammar.flatten("#adv#")
			this.moodAdj = this.grammar.flatten("#adj#")
			this.moodNoun = this.grammar.flatten("#noun#")
			this.moods = this.grammar.flatten("#moods#")

			this.post(`I am ${this.moodAdv} ${this.moodType} like a ${this.moodAdj} ${this.moodNoun} ${this.moods}`)
			
			return ""

		}

		if (s.includes(418))
			return `I'm a mood pot`

		// return `'${s}' isn't a type of coffee`
		return `OK....Have a nice day!`
	}
}