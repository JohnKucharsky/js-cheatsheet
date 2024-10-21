import Image from "next/image";
import { PropsWithChildren } from "react";

export default function UserInfo({
  userName,
  email,
  imgSrc,
  children,
}: PropsWithChildren<{
  userName?: string | null;
  email?: string | null;
  imgSrc?: string | null;
}>) {
  return (
    <div className="text-sm leading-6">
      <div className="flex items-center space-x-4">
        <Image
          src={imgSrc || ""}
          alt="photo"
          className="flex-none w-14 h-14 rounded-full object-cover not-prose"
          loading="lazy"
          quality={100}
          width={56}
          height={56}
        />
        <div className="flex-auto">
          <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
            {userName}
          </div>
          <div className="mt-0.5 dark:text-slate-300">{email}</div>
          {children}
        </div>
      </div>
    </div>
  );
}
