Array.prototype.customReduce = function (callback, initialValue) {
  return initialValue;
};

// Tests
validateResult(
  [15, 16, 17, 18, 19].customReduce((acc, cur) => acc + cur, 0),
  85,
);

validateResult(
  [15, 16, 17, 18, 19].customReduce((acc, cur) => acc + cur),
  85,
);

const pipe =
  (...functions) =>
  (initialValue) =>
    functions.customReduce((acc, fn) => fn(acc), initialValue);

validateResult(
  pipe(
    (x) => x * 2,
    (x) => x * 3,
  )(6),
  36,
);
validateResult(
  pipe(
    (x) => x * 3,
    (x) => x * 3,
  )(9),
  81,
);

const asyncPipe =
  (...functions) =>
  (initialValue) =>
    functions.customReduce(
      (acc, fn) => acc.then(fn),
      Promise.resolve(initialValue),
    );

const p1 = async (a) => a * 5;
const p2 = async (a) => a * 2;
const f3 = (a) => a * 3;
const p4 = async (a) => a * 4;

asyncPipe(p1, p2, f3, p4)(10).then((result) => validateResult(result, 1200));

const asyncPipeAsync =
  (...functions) =>
  (initialValue) =>
    functions.customReduce(async (acc, fn) => fn(await acc), initialValue);

asyncPipeAsync(
  p1,
  p2,
  f3,
  p4,
)(10).then((result) => validateResult(result, 1200));

function validateResult(actualResult, expectedResult) {
  if (JSON.stringify(actualResult) !== JSON.stringify(expectedResult)) {
    throw new Error(
      `Validation failed! Result: ${JSON.stringify(actualResult)},
       Expected: ${JSON.stringify(expectedResult)}`,
    );
  }
  console.log(actualResult);
}
