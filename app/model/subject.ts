module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SubjectSchema = new Schema({
    id: {
      type: "Number",
      unique: true,
      required: true,
    },
    content: {
      type: "String",
    },
    material: {
      type: "Mixed",
    },
    type: {
      type: "Number",
    },
    difficulty: {
      type: "Number",
    },
    createdTime: {
      type: "Number",
    },
    shortSource: {
      type: "Mixed",
    },
    accessories: {
      type: ["Mixed"],
    },
    correctAnswer: {
      choice: {
        type: "Date",
      },
      type: {
        type: "Number",
      },
    },
    hasVideo: {
      type: "Number",
    },
  });

  return mongoose.model("Subject", SubjectSchema);
};
