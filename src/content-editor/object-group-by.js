const groupBy = (arr, callback) => {
  return {};
};

// Tests
validateResult(
  groupBy(
    [
      { name: "asparagus", type: "vegetables", quantity: 5 },
      { name: "bananas", type: "fruit", quantity: 0 },
      { name: "goat", type: "meat", quantity: 23 },
      { name: "cherries", type: "fruit", quantity: 5 },
      { name: "fish", type: "meat", quantity: 22 },
    ],
    ({ type }) => type,
  ),
  {
    vegetables: [{ name: "asparagus", type: "vegetables", quantity: 5 }],
    fruit: [
      { name: "bananas", type: "fruit", quantity: 0 },
      { name: "cherries", type: "fruit", quantity: 5 },
    ],
    meat: [
      { name: "goat", type: "meat", quantity: 23 },
      { name: "fish", type: "meat", quantity: 22 },
    ],
  },
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
