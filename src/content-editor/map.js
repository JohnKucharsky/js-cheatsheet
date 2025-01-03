Array.prototype.customMap = function (callbackFn) {
  if (typeof callbackFn !== "function") {
    throw new TypeError("Callback must be a function");
  }

  return [];
};

// Tests
validateResult(
  [1, 4, 9, 16].customMap((x) => x * 2),
  [2, 8, 18, 32],
);
validateResult(
  [
    { key: 1, value: 10 },
    { key: 2, value: 20 },
    { key: 3, value: 30 },
  ].customMap(({ key, value }) => ({
    [key]: value,
  })),
  [{ 1: 10 }, { 2: 20 }, { 3: 30 }],
);
validateResult(["1", "2", "3"].customMap(Number), [1, 2, 3]);
validateResult(
  [1, 2, 3, 4, 5].customMap((num, idx, arr) => {
    const previousSum =
      idx > 0 ? arr.slice(0, idx).reduce((acc, curr) => acc + curr, 0) : 0;
    return previousSum + num;
  }),
  [1, 3, 6, 10, 15],
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
