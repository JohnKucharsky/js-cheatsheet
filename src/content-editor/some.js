Array.prototype.customSome = function (callback) {
  return false;
};

// Tests
const array = [1, 2, 3, 4, 5];

const even = (element) => element % 2 === 0;
validateResult(array.customSome(even), true);

const equal90 = (element) => element === 90;
validateResult(array.customSome(equal90), false);

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
