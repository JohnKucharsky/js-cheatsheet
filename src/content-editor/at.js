Array.prototype.customAt = function (index) {
  return index;
};

const array1 = [5, 12, 8, 130, 44];
array1.customAt(-1); // 44

// test
validateResult(array1.customAt(-1), 44);
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
