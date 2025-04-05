import { notFound } from "next/navigation";
import { getAllFilesNames, getAllMDXComponents } from "@/get-mdx-components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const resParams = await params;
  return {
    title: `${resParams.slug} – JS Cheatsheets`,
    description:
      "Get a random JavaScript code snippet from across the entire cheatsheet collection. Great for daily practice, discovery, or surprise learning.",
    openGraph: {
      title: "Pick Random – JS Cheatsheets",
      description:
        "Explore a randomly selected code example from all available JavaScript challenges, data structures, and patterns.",
      url: "https://js-cheatsheet-v1.vercel.app/pick-random",
      siteName: "JS Cheatsheets",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Pick Random – JS Cheatsheets",
      description:
        "Get inspired with a random JavaScript snippet pulled from the full cheatsheet collection. A fun way to explore and learn.",
    },
    alternates: {
      canonical: "https://js-cheatsheet-v1.vercel.app",
    },
  };
}

export async function generateStaticParams() {
  const filesNames = getAllFilesNames();

  return filesNames.map(({ slug }) => ({ slug }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const allFiles = await getAllMDXComponents();

  if (!allFiles.object[params.slug]) {
    notFound();
  }

  const Content = allFiles.object[params.slug];

  return <Content />;
}
