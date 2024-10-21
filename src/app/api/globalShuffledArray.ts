export let globalNums: number[] = [];

export const setGlobalNums = (nums: number[]) => {
  globalNums = nums;
};

export const popNum = () => globalNums.pop();
