Array.prototype.customFind = function (callback) {
  return undefined;
};

const array1 = [5, 12, 8, 130, 44];
const found = array1.customFind((element) => element > 10);

// Test
validateResult(found, 12);

const inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];

const result = inventory.customFind(({ name }) => name === "cherries");
const result1 = inventory.customFind(({ name }) => name === "nothing");

// Tests
validateResult(result, { name: "cherries", quantity: 5 });
validateResult(result1, undefined);

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
