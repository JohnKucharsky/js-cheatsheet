Array.prototype.customUnshift = function (...elements) {
  return this.length;
};

// Tests
validateResult(
  (() => {
    const arr = [3, 4, 5];
    const newLength = arr.customUnshift(1, 2);
    return { arr, newLength };
  })(),
  { arr: [1, 2, 3, 4, 5], newLength: 5 },
);

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
