import Menu from "./menu.mdx";
import { Metadata } from "next";
import TelegramIcon from "@/components/telegram-icon";
import Link from "next/link";
import Image from "next/image";
import GitHubImg from "@/components/github-mark-white.png";
import SearchDialog from "@/components/search-dialog";

export const metadata: Metadata = {
  title: "JS Cheatsheet",
};

export default function Page() {
  return (
    <>
      <div className={"flex flex-row items-center justify-between my-6"}>
        <h2 style={{ margin: 0 }}>List of topics</h2>
        <SearchDialog />
      </div>
      <Menu />
      <h3>Links</h3>
      <div className={"flex gap-2 items-center"}>
        <Link href={"https://t.me/johnkucharsky"} className={"not-prose"}>
          <TelegramIcon />
        </Link>
        <Link
          href={"https://github.com/JohnKucharsky/js-cheatsheet"}
          className={"not-prose"}
        >
          <Image src={GitHubImg} alt={"GitHub"} width={36} height={36} />
        </Link>
      </div>
    </>
  );
}
