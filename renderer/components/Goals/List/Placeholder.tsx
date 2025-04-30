import { styled } from "../../../stitches.config";

const Container = styled("div", {
  placeSelf: "center",
  fontSize: "1.2rem",
  fontWeight: "semibold",
  color: "$gray500",
});

type Props = {
  isFetched: boolean;
};

export default function ListPlaceholder({ isFetched }: Props) {
  return (
    <Container>{isFetched ? "No goals yet." : "Fetching goals ..."}</Container>
  );
}
