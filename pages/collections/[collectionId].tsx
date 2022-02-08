import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Collection = () => {
  const router = useRouter();
  return <Link href="/">{router.query.collectionId}</Link>;
};

export default Collection;
