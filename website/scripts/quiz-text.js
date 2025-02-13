// Function to load quiz texts from JSON files
async function loadQuizTexts() {
	const quizTexts = {
		question1: "",
		question2: { text: "", targetWord: "", occurrences: 0 },
		question3: "",
	};

	try {
		// Load question 1 text
		const q1Response = await fetch("/website/data/quiz-texts/question1.json");
		const q1Data = await q1Response.json();
		// Randomly select one text from the array
		const q1Text =
			q1Data.texts[Math.floor(Math.random() * q1Data.texts.length)];
		quizTexts.question1 = q1Text.content;

		// Load question 2 text
		const q2Response = await fetch("/website/data/quiz-texts/question2.json");
		const q2Data = await q2Response.json();
		const q2Text =
			q2Data.texts[Math.floor(Math.random() * q2Data.texts.length)];
		quizTexts.question2 = {
			text: q2Text.content,
			targetWord: q2Text.targetWord,
			occurrences: q2Text.occurrences,
		};

		// Load question 3 text
		const q3Response = await fetch("/website/data/quiz-texts/question3.json");
		const q3Data = await q3Response.json();
		const q3Text =
			q3Data.texts[Math.floor(Math.random() * q3Data.texts.length)];
		quizTexts.question3 = q3Text.content;

		return quizTexts;
	} catch (error) {
		console.error("Error loading quiz texts:", error);
		// Return default texts in case of error
		return {
			question1: "Error loading text. Please refresh the page.",
			question2: {
				text: "Error loading text. Please refresh the page.",
				targetWord: "use",
				occurrences: 0,
			},
			question3: "Error loading text. Please refresh the page.",
		};
	}
}

// Export the loading function
if (typeof module !== "undefined" && module.exports) {
	module.exports = { loadQuizTexts };
}
