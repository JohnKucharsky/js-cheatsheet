export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
};

const BASE_URL = "https://emkc.org/api/v2/piston";

export interface Piston {
  run: Run;
  language: string;
  version: string;
}

export interface Run {
  stdout: string;
  stderr: string;
  code: number;
  signal: null;
  output: string;
}

export const executeCode = async (
  language: "typescript" | "javascript",
  sourceCode: string,
): Promise<Piston> => {
  const response = await fetch(`${BASE_URL}/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
