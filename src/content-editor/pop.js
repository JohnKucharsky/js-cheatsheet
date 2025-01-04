Array.prototype.customPop = function () {
  return undefined;
};

// Tests
validateResult(["Apple", "Banana", "Cherry"].customPop(), "Cherry");

const fruits = ["Apple", "Banana", "Cherry"];
const lastFruit = fruits.customPop();
validateResult(lastFruit, "Cherry");
validateResult(fruits, ["Apple", "Banana"]);

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
