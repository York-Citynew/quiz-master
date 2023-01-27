const fetch = require("node-fetch");
const createUserQuiz =
  require("../../src/utils/firebase/firebase.utils").createUserQuiz;

export const handler = async (event) => {
  try {
    const { user, category, quantity, difficulty } = JSON.parse(event.body);
    let categoryCode = "";
    switch (category) {
      case "video games":
        categoryCode = 15;
        break;
      case "movies":
        categoryCode = 11;
        break;
      case "computers":
        categoryCode = 18;
        break;

      default:
        break;
    }
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${quantity}&category=${categoryCode}&difficulty=${difficulty}&type=multiple`
    ).then((res) => res.json());
    const answers = [];
    const tests = await res.results.map((item, index) => {
      const options = item.incorrect_answers;
      answers.push(item.correct_answer);
      options.push(item.correct_answer);
      const newObj = {
        ...item,
        options,
      };
      delete newObj.incorrect_answers;
      delete newObj.correct_answer;
      return newObj;
    });
    await createUserQuiz(user, tests, answers);
    return {
      statusCode: 200,
      body: JSON.stringify({ res }),
    };
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
//transport scoreCalculator here to avoid manipulation
