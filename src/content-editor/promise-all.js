function myPromiseAll(promises) {
  return promises;
}

// Tests
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "first");
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "second");
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000, "third");
});

myPromiseAll([promise1, promise2, promise3]).then((values) => {
  console.log(values);
  // Expected: [ 'first', 'second', 'third' ]
  validateResult(values, ["first", "second", "third"]);
});

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
