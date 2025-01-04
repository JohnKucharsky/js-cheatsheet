Array.prototype.customFlatMap = function (callback, thisArg) {
  return [];
};

const data = [
  {
    id: 1,
    name: "Category A",
    items: [
      {
        id: 2,
        name: "Subcategory A1",
      },
      {
        id: 5,
        name: "Subcategory A2",
      },
    ],
  },
  {
    id: 8,
    name: "Category B",
    items: [
      {
        id: 9,
        name: "Subcategory B1",
      },
      {
        id: 12,
        name: "Subcategory B2",
      },
    ],
  },
];

const items = data
  .map((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.name,
    })),
  )
  .flat();

const items2 = data.customFlatMap((category) =>
  category.items.map((item) => ({
    ...item,
    category: category.name,
  })),
);

// Tests
validateResult(items2, [
  { id: 2, name: "Subcategory A1", category: "Category A" },
  { id: 5, name: "Subcategory A2", category: "Category A" },
  { id: 9, name: "Subcategory B1", category: "Category B" },
  { id: 12, name: "Subcategory B2", category: "Category B" },
]);

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
