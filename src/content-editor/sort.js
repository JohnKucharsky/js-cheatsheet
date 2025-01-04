Array.prototype.customSort = function (compareFn) {
  if (typeof compareFn !== "function") {
    compareFn = (a, b) => (String(a) > String(b) ? 1 : -1);
  }

  return this;
};

// Tests
const months = ["March", "Jan", "Feb", "Dec"];
months.customSort();
validateResult(months, ["Dec", "Feb", "Jan", "March"]);

const array1 = ["1", "30", "4", "21", "1000"];
array1.customSort();
validateResult(array1, ["1", "1000", "21", "30", "4"]);

const array2 = [1, 30, 4, 21, 1000];
array2.customSort();
validateResult(array2, [1, 1000, 21, 30, 4]);

const array3 = [5, 8, 100, 0];
array3.customSort((a, b) => a - b);
validateResult(array3, [0, 5, 8, 100]);

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
