Array.prototype.customFlat = function (depth = 1) {
  return [];
};

const arr = [0, 1, [2, [3, [4, 5]]]];

const result1 = arr.customFlat();
const result2 = arr.customFlat(2);
const result3 = arr.customFlat(Infinity);

// Tests
validateResult(result1, [0, 1, 2, [3, [4, 5]]]);
validateResult(result2, [0, 1, 2, 3, [4, 5]]);
validateResult(result3, [0, 1, 2, 3, 4, 5]);

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
