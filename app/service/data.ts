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
