"use client";

import { useState } from "react";

export default function ShowHide({ children }: { children: any }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>Show</button>
      {show ? children : null}
    </>
  );
}
