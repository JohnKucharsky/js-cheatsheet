Array.prototype.myConcat = function (...arrays) {
  return arrays;
};

const arr = [1, 2, 3];
const arr2 = [4, 5, 6, [1]];
const arr3 = [7, 8, 9];
const concat = arr.myConcat(arr2, arr3, 10);
console.log(concat);
// [1, 2, 3, 4, 5, 6, [1], 7, 8, 9, 10]

// test
validateResult(concat, [1, 2, 3, 4, 5, 6, [1], 7, 8, 9, 10]);
function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(
        actualResult,
      )}, Expected: ${JSON.stringify(expectedResult)}`,
    );
  }

  console.log(actualResult);
}
