import Collections from "@/components/Collections";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/banner.png" alt="banner" width={2000} height={800} className="w-screen" />
      <Collections />
    </>
  );
}

export const dynamic = "force-dynamic";

