import Menu from "./menu.mdx";
import { Metadata } from "next";
import Link from "next/link";
import SearchDialog from "@/components/search-dialog";

const links = [
  {
    href: "https://github.com/JohnKucharsky/js-cheatsheet",
    title: "this project",
  },
  {
    href: "https://github.com/JohnKucharsky/react-effector-mui",
    title: "react effector mui",
  },
  {
    href: "https://github.com/JohnKucharsky/react-redux-mui",
    title: "react redux mui",
  },
  {
    href: "https://github.com/JohnKucharsky/react-mobx-mui",
    title: "react mobx mui",
  },
];

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
        {links.map((link) => (
          <li key={link.title}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>

      <h3>Contacts</h3>
      <ul>
        <li>
          <Link href={"https://t.me/johnkucharsky"}>telegram</Link>
        </li>
        <li>
          <Link
            href={"https://hh.ru/resume/d9f27928ff0e3ac9b20039ed1f4648646e454a"}
          >
            hh.ru
          </Link>
        </li>
      </ul>
    </>
  );
}
