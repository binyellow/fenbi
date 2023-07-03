module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 题目
  const QuestionsSchema = new Schema({
    id: {
      type: "Number",
      unique: true,
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
    // 粉笔题目类型
    // 0-常识判断
    // 1-言语理解与表达
    // 2-数量关系
    // 3-判断推理
    // 4-资料分析
    fenbiType: {
      type: "Number",
    },
  });

  return mongoose.model("questions", QuestionsSchema);
};
