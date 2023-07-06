import { shen } from "../service/data";

export const filterData = (data, provinceName?) => {
  if (provinceName) return data?.filter((en) => en?.province === provinceName);
  const res = data?.filter((en) => !en?.year || !en?.province);
  return res;
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

// 修正省市名称
export const fillYearAndProvince2 = (data, province = "湖南省") => {
  return filterData(data, province).map((exercise) => {
    const reg2 = /(.+[省市])/;
    const matchResult1 = exercise?.province?.match(reg2) || [];
    let province = matchResult1[1]; // 湖南省
    const matchedProvince = shen.find((en) => exercise?.province?.includes(en))?.replace(/省|市/, "");
    console.log("删除省市的数据", province, matchedProvince);
    if (matchedProvince) {
      if (province?.includes(matchedProvince) && province !== matchedProvince) province = matchedProvince;
    }

    let syntheticExercise = exercise;
    if (province && province !== exercise?.province) {
      syntheticExercise.province = province;
    }
    return syntheticExercise;
  });
};

// 将query参数转换成string[]
export const transQuery = (query) => {
  return Object.keys(query)?.reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: { $in: query?.[cur]?.split(",") },
    };
  }, {});
};

// 根据题目ids和fenbiType来拼接出筛选条件
export const genFilterByQIdsAndType = (questionIds, fenbiType) => {
  let match: any = { id: { $in: questionIds } };
  if (fenbiType) {
    match.fenbiType = +fenbiType;
  }

  return [
    { $match: match },
    {
      $addFields: {
        __order: { $indexOfArray: [questionIds, "$id"] },
      },
    },
    { $sort: { __order: 1 } },
    { $project: { __order: 0 } },
  ];
};
