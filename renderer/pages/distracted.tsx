import Head from "next/head";

export default function Distracted() {
  return (
    <>
      <Head>
        <title>Distracted</title>
      </Head>
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="text-8xl font-bold mb-5">
          <span role="img" aria-label="distracted">
            🤯
          </span>
        </h1>
        <h2 className="text-3xl font-bold text-gray-300">
          You seem distracted.
        </h2>
        <p className="text-2xl text-gray-500">
          Make sure you are paying attention!
        </p>
      </div>
    </>
  );
}
