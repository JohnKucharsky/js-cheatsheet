import { design } from "@/content/design";
import { jsNative } from "@/content/js-native";
import { learnJsAndMdn } from "@/content/learn-js-and-mdn";
import { leetcode } from "@/content/leetcode";
import { lodash } from "@/content/lodash";
import { react } from "@/content/react";
import { theory } from "@/content/theory";
import { various } from "@/content/various";

export const listOfAllItems = [
  ...design,
  ...jsNative,
  ...learnJsAndMdn,
  ...leetcode,
  ...lodash,
  ...react,
  ...theory,
  ...various,
];

export const quantity = listOfAllItems.length;
