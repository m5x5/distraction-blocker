import { ipcRenderer } from "electron";
import prettyMs from "pretty-ms";
import { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import EditDedicationModal from "../../Modal/EditDedicationModal";
import { deleteDedication } from "../api";
import { useDedicationsContext } from "../Context";
import { DraftDedication } from "../typings";

const Container = styled("div", {
  backgroundColor: "$cardBackground",
  borderRadius: "0.5rem",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Title = styled("h3", {
  color: "$text",
  fontFamily: "$sans",
  fontSize: "1.1rem",
});

const Text = styled("p", {
  color: "$gray500",
  fontSize: "0.8rem",
});

export default function DedicationItem({ dedication }) {
  const { editDedication } = useDedicationsContext();
  const [showEditModal, setState] = useState(false);
  const [time, setTime] = useState("");

  const { quantity, hours, name } = dedication;

  useEffect(() => {
    if (!dedication.tracker) return;
    const tracker = dedication.tracker.toLowerCase();
    ipcRenderer.invoke("getWeeklySummary", tracker).then((t) => {
      setTime(prettyMs(t * 1000, { unitCount: 2 }));
    });
  }, [dedication.tracker]);

  const setShowEditModal = (value: boolean) => {
    setState(value);
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const handleSubmit = (draftDedication: DraftDedication) => {
    editDedication(dedication.id, draftDedication);
  };

  const handleDelete = () => {
    deleteDedication(dedication.id);
  };

  if (!dedication) return null;
  const perDay = ((quantity * hours) / 7).toFixed(2);
  return (
    <Container>
      <Title>{name}</Title>
      <Text>{perDay}h / day</Text>
      {/* <Text>
        <ItemDeleteButton onClick={handleDelete} />
        <Label>Total</Label>
        {!!time && (
          <>
            <br />
            <Label>Tracked</Label>
            {time}
          </>
        )}
        {quantity > 1 ? (
          <>
            <br />
            <Label>Quantity</Label>
            {<ItemQuantityView value={quantity} />} for {hours} hours
          </>
        ) : null}
      </Text> */}
      {/* <Button onClick={openEditModal}>Edit</Button> */}
      {showEditModal && (
        <EditDedicationModal
          onHide={() => setShowEditModal(false)}
          onSubmit={handleSubmit}
          dedication={dedication}
        />
      )}
    </Container>
  );
}
