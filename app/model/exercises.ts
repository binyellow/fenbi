module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ExercisesSchema = new Schema({
    _id: {
      $oid: {
        type: "ObjectId",
      },
    },
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
      type: "Array",
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
    subjects: {
      type: [mongoose.Types.ObjectId],
    },
  });

  return mongoose.model("Exercises", ExercisesSchema);
};
