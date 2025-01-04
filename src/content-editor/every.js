Array.prototype.customEvery = function (callback) {
  return false;
};

const arr = [1, 30, 39, 29, 10, 13];
arr.customEvery((currentValue) => currentValue > 40); // false

// Tests
validateResult(
  arr.customEvery((currentValue) => currentValue > 40),
  false,
);
validateResult(
  arr.customEvery((currentValue) => currentValue < 40),
  true,
);

const isSubset = (array1, array2) =>
  array2.customEvery((element) => array1.includes(element));

// More tests
validateResult(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6]), true);
validateResult(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7]), false);

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
