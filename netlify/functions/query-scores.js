const queryScores =
  require("../../src/utils/firebase/firebase.utils").queryScoresData;
export const handler = async () => {
  try {
    const scores = await queryScores();
    return {
      statusCode: 200,
      body: JSON.stringify(scores),
    };
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
