Array.prototype.customJoin = function (separator = ",") {
  return separator;
};

// Tests
validateResult(["Fire", "Air", "Water"].customJoin(), "Fire,Air,Water");
validateResult(["Fire", "Air", "Water"].customJoin(""), "FireAirWater");
validateResult(["Fire", "Air", "Water"].customJoin("-"), "Fire-Air-Water");

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
validateResult(matrix.customJoin(), "1,2,3,4,5,6,7,8,9");
validateResult(matrix.customJoin(";"), "1,2,3;4,5,6;7,8,9");

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
