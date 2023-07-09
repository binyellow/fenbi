import { typeMap } from "../service/data";

// 根据题型name来生成type
export const genFenBiTypeByName = (name) => {
  const keys = Object.keys(typeMap);
  const matchKey = keys?.find((key) => name?.includes(key)) || "其他";
  return typeMap?.[matchKey];
};

// 根据chapters生成对应题型的range
export const genChapterTypesRange = (chapters) => {
  return chapters?.reduce((pre, cur) => {
    const last = pre?.[pre?.length - 1]?.value || 0;
    return [...pre, { value: last + cur?.questionCount, fenbiType: genFenBiTypeByName(cur?.name) }];
  }, []);
};
