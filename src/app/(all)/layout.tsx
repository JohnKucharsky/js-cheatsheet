import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="prose prose-invert text-gray-300/70 px-2 sm:px-6 md:px-8 mx-auto mt-8 mb-6 relative z-1">
      {children}
    </div>
  );
}
