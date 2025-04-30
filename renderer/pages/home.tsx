import Head from "next/head";
import { useState } from "react";
import DetailsView from "../components/Details";
import Tab from "../components/Tab";
import TabSwitcher from "../components/TabSwitcher";
import { DetailsContextProvider } from "../context/DetailsContext";
import { LockContextProvider } from "../context/LockContext";
import { styled } from "../stitches.config";

const Container = styled("div", {
  display: "grid",
  width: "100vw",
  height: "100vh",
  gridTemplateColumns: "17vw 2fr 25vw",
});

function Home() {
  const [active, setActive] = useState("goals");
  return (
    <>
      <Head>
        <title>Leptum - Blocker</title>
      </Head>
      <Container>
        <LockContextProvider>
          <DetailsContextProvider>
            <TabSwitcher setActive={setActive} active={active} />
            <Tab active={active} />
            <DetailsView />
          </DetailsContextProvider>
        </LockContextProvider>
      </Container>
    </>
  );
}

export default Home;
