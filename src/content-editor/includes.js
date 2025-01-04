function sameValueZero(x, y) {
  return (
    x === y ||
    (typeof x === "number" && typeof y === "number" && x !== x && y !== y)
  );
}

Array.prototype.customIncludes = function (searchElement, fromIndex = 0) {
  return false;
};

// Tests
validateResult([1, 2, 3].customIncludes(2), true);
validateResult([1, 2, 3].customIncludes(4), false);
validateResult([1, 2, 3].customIncludes(3, 3), false);
validateResult([1, 2, 3].customIncludes(3, -1), true);
validateResult([1, 2, NaN].customIncludes(NaN), true);
validateResult(["1", "2", "3"].customIncludes(3), false);

const arr = ["a", "b", "c"];
validateResult(arr.customIncludes("a", -100), true);
validateResult(arr.customIncludes("a", -2), false);
validateResult(arr.customIncludes("a", -3), true);

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
