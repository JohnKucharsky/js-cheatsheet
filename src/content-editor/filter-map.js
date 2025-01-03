export const filterMap = (array, filterBoolean, mapCallback) => {
  return [];
};

// Tests
const people = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 30, active: false },
  { name: "Charlie", age: 35, active: true },
];

const activeNames = filterMap(
  people,
  (person) => person.active,
  (person) => person.name,
);

validateResult(activeNames, ["Alice", "Charlie"]);

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
