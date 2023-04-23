module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ExercisesSchema = new Schema({
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
    features: {
      shenlunAsNomal: {
        type: "Date",
      },
      needVipSubmit: {
        type: "Date",
      },
    },
  });

  return mongoose.model("exercises", ExercisesSchema);
};
