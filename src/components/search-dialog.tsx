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
      <DialogContent className="min-h-5 bg-stone-950 [&>button]:absolute [&>button]:top-2 [&>button]:right-2">
        <SearchInput documents={documents} />
      </DialogContent>
    </Dialog>
  );
}
