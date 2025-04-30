import { ipcRenderer } from "electron";
import Image from "next/image";
import { useEffect, useState } from "react";
import { styled } from "../../stitches.config";

const Container = styled("div", {
  "> div": {
    position: "relative",
    height: "3rem",
    width: "3rem",
    borderRadius: "5rem",
    overflow: "hidden",
  },
});

const PlaceholderImage = styled("div", {
  backgroundColor: "#F6F7FF",
  height: "100%",
  width: "100%",
});

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    ipcRenderer.invoke("getProfile").then((profile) => {
      console.log(profile);
      setProfile(profile);
    });
  }, []);

  const avatarUrl = profile?.picture;

  return (
    <Container>
      <div>
        {avatarUrl ? (
          <Image layout="fill" src={avatarUrl} />
        ) : (
          <PlaceholderImage />
        )}
      </div>
    </Container>
  );
}
