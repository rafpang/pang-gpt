import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import pdt from "../public/favicon.png";

export default function Home() {
  const { isLoading, error, user } = useUser();
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <Head>
        <title>PangGPT | Login or Signup</title>
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-800 text-center text-white">
        <div>
          {!!user && <Link href="/api/auth/logout">Logout</Link>}
          {!user && (
            <div className="bg-white-300 max-w-sm rounded-lg border border-gray-200 p-4 shadow-md sm:p-6 lg:p-8">
              <h1>Welcome to PangGPT</h1>
              <Image src={pdt} width={200} height={200} alt="robot" />
              <div className="flex items-center ">
                <Link href="/api/auth/login" className="btn">
                  Login
                </Link>
                <Link href="/api/auth/signup" className="btn">
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context.req, context.res);
  if (!!session) {
    return {
      redirect: {
        destination: "/chat",
      },
    };
  }
  return {
    props: {},
  };
};
