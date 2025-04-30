import { ipcRenderer } from "electron";
import { useEffect } from "react";
import { styled } from "../../../stitches.config";
import Button from "../../core/Button";
import CreateDedicationModal from "../../Modal/CreateDedicationModal";
import { useDedicationsContext } from "../Context";
import DedicationItem from "./Item";

const List = styled("div", {
  marginTop: "1rem",
  display: "flex",
  gap: "1rem",
  flexFlow: "column",
});

export default function DedicationsList() {
  const { dedications, showAddModal, setShowAddModal, createDedication } =
    useDedicationsContext();

  useEffect(() => {
    ipcRenderer.on("create", () => {
      setShowAddModal(true);
    });
    return () => {
      ipcRenderer.removeAllListeners("create");
    };
  }, []);

  const handleHide = (value) => {
    setShowAddModal(!!value);
  };

  const handleSubmit = (name, hours) => {
    const dedication = {
      name,
      hours,
    };

    createDedication(dedication);
  };

  const handleShow = () => {
    setShowAddModal(true);
  };

  return (
    <List>
      {dedications
        .sort((a, b) => b.hours * b.quantity - a.hours * a.quantity)
        .map((dedication) => (
          <DedicationItem dedication={dedication} key={dedication.id} />
        ))}

      <CreateDedicationModal
        isOpen={showAddModal}
        onHide={handleHide}
        onSubmit={handleSubmit}
      />
      <Button onClick={handleShow}>Add Dedication</Button>
    </List>
  );
}
