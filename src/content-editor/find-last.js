Array.prototype.customFindLast = function (callback) {
  return undefined;
};

const array1 = [5, 12, 8, 130, 44];
const found = array1.customFindLast((element) => element > 10);

// Test
validateResult(found, 44);

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
