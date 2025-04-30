import {
  BadgeCheckIcon,
  RefreshIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Menu, useContextMenu } from "react-contexify";
import { styled } from "../../../stitches.config";
import Select from "../../core/Select";
import { promoteToExample, reclassifyClassification } from "./api";

const Container = styled("li", {
  fontSize: "1rem",
  display: "grid",
  gridTemplateColumns: "3fr auto auto",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.5rem",
  // marginBottom: "0.5rem",
  borderBottom: "2px solid $gray800",
  gap: "1rem",
});

const MutedText = styled("span", {
  color: "$gray600",
  fontSize: "0.8rem",
});

const StyledItem = styled("span", {
  fontSize: "0.9rem",
  width: "100%",
  padding: "0.3rem 0.8rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "$gray300",

  "&:hover": {
    backgroundColor: "$gray700",
  },
});

const Text = styled("p", {
  position: "relative",
  margin: 0,
  maxWidth: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  "&:after": {
    content: "",
    position: "absolute",
    top: "0",
    right: "0",
    width: "30%",
    height: "100%",
    background:
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, $backgroundColor 100%)",
    pointerEvents: "none",
  },
});

export default function ClassificationItem({ item, onClassifyGuess }) {
  const MENU_ID = "classification-item-menu-" + item.id;
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const onClick = () => {
    promoteToExample(item.id);
  };

  const onReclassify = () => {
    reclassifyClassification(item.id, item.string);
  };

  function handleContextMenu(event) {
    event.preventDefault();
    show(event, {
      props: {
        key: "value",
      },
    });
  }

  return (
    <>
      <Container onContextMenu={handleContextMenu}>
        <Text>{item.string}</Text>
        <MutedText>{item.status}</MutedText>
        <Select
          title="Select Mode"
          value={item.classification}
          onChange={onClassifyGuess}
        >
          <option value="Development">Development</option>
          <option value="Study">Study</option>
          <option value="Entertainment">Entertainment</option>
          <option value="System">System</option>
        </Select>
        <Menu id={MENU_ID} style={{ background: "#1F2937" }}>
          {item.status !== "example" ? (
            <StyledItem onClick={onClick}>
              <BadgeCheckIcon style={{ height: "1rem" }} />
              Promote to Example
            </StyledItem>
          ) : (
            <StyledItem onClick={onClick}>
              <XCircleIcon style={{ height: "1rem" }} />
              Remove from Examples
            </StyledItem>
          )}
          <StyledItem onClick={onReclassify}>
            <RefreshIcon style={{ height: "1rem" }} />
            Reclassify
          </StyledItem>
        </Menu>
      </Container>
    </>
  );
}
