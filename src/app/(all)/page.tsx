import Menu from "./menu.mdx";
import { Metadata } from "next";
import Link from "next/link";
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
      <h3>Projects</h3>
      <ul>
        <li>
          <Link href={"https://github.com/JohnKucharsky/js-cheatsheet"}>
            this project
          </Link>
        </li>
        <li>
          <Link href={"https://github.com/JohnKucharsky/react-effector-mui"}>
            react effector mui
          </Link>
        </li>
        <li>
          <Link href={"https://github.com/JohnKucharsky/react-redux-mui"}>
            react redux mui
          </Link>
        </li>
      </ul>

      <h3>Contacts</h3>
      <ul>
        <li>
          <Link href={"https://t.me/johnkucharsky"}>telegram</Link>
        </li>
        <li>
          <Link href={"https://hh.ru/"}>hh.ru</Link>
        </li>
      </ul>
    </>
  );
}
