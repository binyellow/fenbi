module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 练习，例如2023-湖南省考
  const ExercisesSchema = new Schema({
    id: {
      type: "Number",
      unique: true,
    },
    userId: {
      type: "Number",
    },
    createdTime: {
      type: "Number",
    },
    updatedTime: {
      type: "Number",
    },
    status: {
      type: "Number",
    },
    quizId: {
      type: "Number",
    },
    client: {
      type: "String",
    },
    features: {},
    version: {
      type: "Number",
    },
    userAnswers: {},
    elapsedTime: {
      type: "Number",
    },
    currentTime: {
      type: "Number",
    },
    sheet: {
      id: {
        type: "Number",
      },
      keypointId: {
        type: "Number",
      },
      type: {
        type: "Number",
      },
      name: {
        type: "String",
      },
      paperId: {
        type: "Number",
      },
      questionCount: {
        type: "Number",
      },
      time: {
        type: "Number",
      },
      chapters: {
        type: ["Mixed"],
      },
      questionIds: {
        type: ["Number"],
      },
      requestType: {
        type: "Number",
      },
      requestNum: {
        type: "Number",
      },
      difficulty: {
        type: "Number",
      },
      features: {},
    },
    year: {
      type: "string",
    },
    province: {
      type: "string",
    },
  });

  return mongoose.model("exercises", ExercisesSchema);
};
