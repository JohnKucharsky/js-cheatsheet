Promise.customAny = function (promises) {
  return promises;
};

// Tests
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises = [promise1, promise2, promise3];

Promise.customAny(promises)
  .then((value) => {
    console.log(value);
    // Expected: "quick"
    validateResult(value, "quick");
  })
  .catch(console.error);

function validateResult(actualResult, expectedResult) {
  if (actualResult !== expectedResult) {
    throw new Error(
      `Validation failed! Result: ${actualResult}, Expected: ${expectedResult}`,
    );
  }
  console.log(`Validation passed: ${actualResult}`);
}
