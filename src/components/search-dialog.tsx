import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import SearchInput from "@/components/search-input";
import { getAllFilesNames } from "@/get-mdx-components";

export default function SearchDialog() {
  const documents = getAllFilesNames();

  return (
    <Dialog>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <button className="btn">
          <SearchIcon />
        </button>
      </DialogTrigger>
      <DialogContent style={{ minHeight: "20rem" }}>
        <SearchInput documents={documents} />
      </DialogContent>
    </Dialog>
  );
}
