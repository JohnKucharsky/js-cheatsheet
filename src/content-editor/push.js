Array.prototype.customPush = function () {
  return this;
};

// Tests
validateResult(
  (() => {
    const animals = ["pigs", "goats"];
    const count = animals.customPush("cows");
    return { count, animals };
  })(),
  { count: 3, animals: ["pigs", "goats", "cows"] },
);

validateResult(
  (() => {
    const animals = ["pigs", "goats", "cows"];
    animals.customPush("chickens", "cats");
    return animals;
  })(),
  ["pigs", "goats", "cows", "chickens", "cats"],
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
