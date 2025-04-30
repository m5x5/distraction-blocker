import { Menu, useContextMenu } from "react-contexify";
import { styled } from "../../../stitches.config";
import StatusDot from "../../core/StatusDot";
import { deleteRoutine } from "../api";

const Container = styled("div", {
  backgroundColor: "$cardBackground",
  padding: "1rem",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const Title = styled("h3", {
  margin: "0",
  fontSize: "$md",
  color: "$text",
});

type Props = {
  item: {
    name: string;
    id: string;
    [key: string]: any;
  };
  onClick: (item: any) => void;
};

const Item = styled("span", {
  fontSize: "0.9rem",
  width: "100%",
  padding: "0.3rem 0.8rem",
  display: "flex",
  alignItems: "center",
  color: "$text",
  backgroundColor: "$cardBackground",

  "&:hover": {
    backgroundColor: "$backgroundColor",
  },
});

export default function RoutineItem({ item, onClick }: Props) {
  const { name, id } = item || {};
  const MENU_ID = "habit-item-menu-" + id;
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event) {
    event.preventDefault();
    show(event, {
      props: {
        key: "value",
      },
    });
  }

  const onDelete = () => {
    deleteRoutine(id);
  };

  return (
    <Container onContextMenu={handleContextMenu} onClick={onClick}>
      <Title>{name}</Title>
      <StatusDot status={item.status} title={item.status} />
      <Menu id={MENU_ID} style={{ background: "#1F2937" }}>
        <Item onClick={onDelete}>Delete Routine</Item>
      </Menu>
    </Container>
  );
}
