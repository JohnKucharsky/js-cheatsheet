export const SectionName = {
  design: "design",
  "js-native": "js-native",
  "learn-js-and-mdn": "learn-js-and-mdn",
  lodash: "lodash",
  react: "react",
  theory: "theory",
  various: "various",
  sorting: "sorting",
  graphs: "graphs",
} as const;

export type SectionNameType = keyof typeof SectionName;
