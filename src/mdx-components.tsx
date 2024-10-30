import type { MDXComponents } from "mdx/types";
import { CopyToClipboard } from "@/components/copy-to-clipboard";
import * as React from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: (props) => (
      <CopyToClipboard>
        <pre {...props} />
      </CopyToClipboard>
    ),
  };
}
