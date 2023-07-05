// 粉笔题目类型
export enum fenbiTypeEnum {
  changshi = 0,
  yanyu = 1,
  shuliang = 2,
  panduan = 3,
  ziliao = 4,
}

// 题目对应的顺序，后续如果粉笔变化，这里也要调整
export const typeIndex = [
  fenbiTypeEnum.changshi,
  fenbiTypeEnum.yanyu,
  fenbiTypeEnum.shuliang,
  fenbiTypeEnum.panduan,
  fenbiTypeEnum.ziliao,
];

export const shen = [
  "河北省",
  "山西省",
  "辽宁省",
  "吉林省",
  "黑龙江省",
  "江苏省",
  "浙江省",
  "安徽省",
  "福建省",
  "江西省",
  "山东省",
  "河南省",
  "湖北省",
  "湖南省",
  "广东省",
  "海南省",
  "四川省",
  "贵州省",
  "云南省",
  "陕西省",
  "甘肃省",
  "青海省",
  "台湾省",
  "北京市",
  "天津市",
  "上海市",
  "重庆市",
  "宁夏市",
  "新疆市",
  "深圳市",
  "广州市",
  "广西省",
  "内蒙古省",
];
