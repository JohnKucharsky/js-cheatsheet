Array.prototype.customShift = function () {
  return undefined;
};

// Tests
const array1 = [1, 2, 3];
const firstElement = array1.customShift();
validateResult(array1, [2, 3]);
validateResult(firstElement, 1);

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
