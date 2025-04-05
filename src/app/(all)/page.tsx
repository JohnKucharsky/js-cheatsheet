import MdxContent from "./mdx-content.mdx";
import SearchDialog from "@/components/search-dialog";

export default function Page() {
  return (
    <>
      <div className={"flex flex-row items-center justify-between my-6"}>
        <SearchDialog />
      </div>
      <MdxContent />
    </>
  );
}
