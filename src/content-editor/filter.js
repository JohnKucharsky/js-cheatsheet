Array.prototype.myFilter = function (callback) {
  return [];
};

const words = ["spray", "elite", "exuberant", "destruction", "present"];
const result = words.myFilter((word) => word.length > 6);

// Test
validateResult(result, ["exuberant", "destruction", "present"]);

const array = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

// Test
validateResult(array.myFilter(isPrime), [2, 3, 5, 7]);

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
