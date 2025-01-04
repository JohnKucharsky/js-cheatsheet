Array.prototype.customSlice = function (start = 0, end) {
  return [];
};

// Tests
validateResult(["ant", "bison", "camel", "duck", "elephant"].customSlice(2), [
  "camel",
  "duck",
  "elephant",
]);
validateResult(
  ["ant", "bison", "camel", "duck", "elephant"].customSlice(2, 4),
  ["camel", "duck"],
);
validateResult(["ant", "bison", "camel", "duck", "elephant"].customSlice(-2), [
  "duck",
  "elephant",
]);
validateResult(
  ["ant", "bison", "camel", "duck", "elephant"].customSlice(2, -1),
  ["camel", "duck"],
);
validateResult(["ant", "bison", "camel", "duck", "elephant"].customSlice(), [
  "ant",
  "bison",
  "camel",
  "duck",
  "elephant",
]);

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
