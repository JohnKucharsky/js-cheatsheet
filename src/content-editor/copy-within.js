Array.prototype.myCopyWithin = function (target, start = 0, end = this.length) {
  const len = this.length;

  console.log(len, target, start, end);

  return this;
};

// Test cases
const validateResult = (actualResult, expectedResult) => {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)}, Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
};

validateResult([1, 2, 3, 4, 5].myCopyWithin(-100, -3, -1), [3, 4, 3, 4, 5]);
validateResult(["a", "b", "c", "d", "e"].myCopyWithin(0, 3, 4), [
  "d",
  "b",
  "c",
  "d",
  "e",
]);
validateResult(["a", "b", "c", "d", "e"].myCopyWithin(1, 3), [
  "a",
  "d",
  "e",
  "d",
  "e",
]);
validateResult(["a", "b", "c", "d", "e"].myCopyWithin(3, 1, 2), [
  "a",
  "b",
  "c",
  "b",
  "e",
]);
