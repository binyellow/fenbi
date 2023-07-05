import { shen } from "../service/data";

export const filterData = (data) => {
  return data?.filter((en) => !en?.year || !en?.province);
};

// 简单的省 & 年
export const fillYearAndProvince = (data) => {
  return data.map((exercise) => {
    const { sheet } = exercise;
    const reg = /^(\d+)年(.+省)/;
    const matchResult = sheet?.name?.match(reg) || [];
    const year = matchResult[1]; // 2023
    let province = matchResult[2]; // 湖南省
    const matchedProvince = shen.find((en) => sheet?.name?.includes(en));
    if (matchedProvince) {
      if (province?.includes(matchedProvince) && province !== matchedProvince) province = matchedProvince;
    }

    let syntheticExercise = exercise;
    if (year && province) {
      console.log("省 & 年份", year, province);

      syntheticExercise = {
        ...exercise,
        year,
        province,
      };
    }
    return syntheticExercise;
  });
};

// 2020年湖南公务员考试《行测》试题（网友回忆版）
export const fillYearAndProvince1 = (data) => {
  return data.map((exercise) => {
    const { sheet } = exercise;
    const reg = /(\d+)年..市/;
    const matchResult = sheet?.name?.match(reg) || [];
    const year = matchResult[1]; // 2023

    const province = shen.find((en) => {
      const shenName = en?.replace("市", "");
      return sheet?.name?.includes(shenName);
    });

    let syntheticExercise = exercise;
    if (year && !exercise?.year) {
      syntheticExercise.year = year;
    }
    if (province && !exercise?.province) {
      syntheticExercise.province = province;
    }
    if (syntheticExercise?.sheet?.name === "2020年湖南公务员考试《行测》试题（网友回忆版）") {
      console.log(syntheticExercise);
    }
    return syntheticExercise;
  });
};

// 安徽省2019年面向全国重点高校定向招录选调生《行测》题（网友回忆版）
export const fillYearAndProvince2 = (data) => {
  return filterData(data).map((exercise) => {
    const { sheet } = exercise;
    const reg = /(\d+)年/;
    const matchResult = sheet?.name.match(reg) || [];
    const year = matchResult[1]; // 2023

    const reg2 = /(.+省)/;
    const matchResult1 = sheet?.name.match(reg2) || [];
    let province = matchResult1[1]; // 湖南省
    const matchedProvince = shen.find((en) => sheet?.name?.includes(en));
    if (matchedProvince) {
      if (province?.includes(matchedProvince) && province !== matchedProvince) province = matchedProvince;
    }

    let syntheticExercise = exercise;
    if (year && !exercise?.year) {
      syntheticExercise.year = year;
    }
    if (province && !exercise?.province) {
      syntheticExercise.province = province;
    }
    if (sheet?.name === "安徽省2019年面向全国重点高校定向招录选调生《行测》题（网友回忆版）") {
      console.log(
        syntheticExercise?.year,
        syntheticExercise?.province,
        syntheticExercise?.sheet?.name,
        syntheticExercise?.id
      );
    }
    return syntheticExercise;
  });
};
