Array.prototype.customSplice = function (
  startIndex,
  deleteCount,
  ...itemsToAdd
) {
  return this;
};

// Tests
validateResult(
  (() => {
    const myFish = ["angel", "clown", "mandarin", "sturgeon"];
    const removed = myFish.customSplice(2, 0, "drum");
    return { myFish, removed };
  })(),
  { myFish: ["angel", "clown", "drum", "mandarin", "sturgeon"], removed: [] },
);

validateResult(
  (() => {
    const myFish1 = ["angel", "clown", "mandarin", "sturgeon"];
    const removed1 = myFish1.customSplice(2, 0, "drum", "guitar");
    return { myFish1, removed1 };
  })(),
  {
    myFish1: ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"],
    removed1: [],
  },
);

validateResult(
  (() => {
    const myFish2 = ["clown", "mandarin", "sturgeon"];
    const removed2 = myFish2.customSplice(0, 0, "angel");
    return { myFish2, removed2 };
  })(),
  { myFish2: ["angel", "clown", "mandarin", "sturgeon"], removed2: [] },
);

validateResult(
  (() => {
    const myFish3 = ["angel", "clown", "mandarin"];
    const removed3 = myFish3.customSplice(myFish3.length, 0, "sturgeon");
    return { myFish3, removed3 };
  })(),
  { myFish3: ["angel", "clown", "mandarin", "sturgeon"], removed3: [] },
);

validateResult(
  (() => {
    const myFish4 = ["angel", "clown", "drum", "mandarin", "sturgeon"];
    const removed4 = myFish4.customSplice(3, 1);
    return { myFish4, removed4 };
  })(),
  { myFish4: ["angel", "clown", "drum", "sturgeon"], removed4: ["mandarin"] },
);

validateResult(
  (() => {
    const myFish5 = ["angel", "clown", "drum", "sturgeon"];
    const removed5 = myFish5.customSplice(2, 1, "trumpet");
    return { myFish5, removed5 };
  })(),
  { myFish5: ["angel", "clown", "trumpet", "sturgeon"], removed5: ["drum"] },
);

validateResult(
  (() => {
    const myFish6 = ["angel", "clown", "trumpet", "sturgeon"];
    const removed6 = myFish6.customSplice(0, 2, "parrot", "anemone", "blue");
    return { myFish6, removed6 };
  })(),
  {
    myFish6: ["parrot", "anemone", "blue", "trumpet", "sturgeon"],
    removed6: ["angel", "clown"],
  },
);

validateResult(
  (() => {
    const myFish7 = ["parrot", "anemone", "blue", "trumpet", "sturgeon"];
    const removed7 = myFish7.customSplice(2, 2);
    return { myFish7, removed7 };
  })(),
  { myFish7: ["parrot", "anemone", "sturgeon"], removed7: ["blue", "trumpet"] },
);

validateResult(
  (() => {
    const myFish8 = ["angel", "clown", "mandarin", "sturgeon"];
    const removed8 = myFish8.customSplice(-2, 1);
    return { myFish8, removed8 };
  })(),
  { myFish8: ["angel", "clown", "sturgeon"], removed8: ["mandarin"] },
);

validateResult(
  (() => {
    const myFish9 = ["angel", "clown", "mandarin", "sturgeon"];
    const removed9 = myFish9.customSplice(2);
    return { myFish9, removed9 };
  })(),
  { myFish9: ["angel", "clown"], removed9: ["mandarin", "sturgeon"] },
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
