Array.prototype.customReverse = function () {
  return this;
};

// Tests
const array1 = ["one", "two", "three", "four"];
const reversed = array1.customReverse();
validateResult(reversed, ["four", "three", "two", "one"]);
validateResult(array1, ["four", "three", "two", "one"]);

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
