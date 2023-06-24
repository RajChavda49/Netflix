import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentuser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        parment: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}
