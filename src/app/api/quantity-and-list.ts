import { arrayMethods } from "@/content/array-methods";
import { bigFrontEnd } from "@/content/big-front-end";
import { learnJs } from "@/content/learn-js";
import { leetcode } from "@/content/leetcode";
import { lodash } from "@/content/lodash";
import { objectAndPromise } from "@/content/object-and-promise";
import { various } from "@/content/various";
import { various2 } from "@/content/various2";
import { principles } from "@/content/principles";
import { design } from "@/content/design";

export const listOfAllItems = [
  ...arrayMethods,
  ...bigFrontEnd,
  ...learnJs,
  ...leetcode,
  ...lodash,
  ...objectAndPromise,
  principles,
  ...various,
  ...various2,
  ...design,
];

export const quantity = listOfAllItems.length;
