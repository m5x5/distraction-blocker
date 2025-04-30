import { useState } from "react";
import Modal from ".";
import Button from "../core/Button";
import Input from "../core/Input";
import Label from "../core/Label";

type Props = {
  isOpen: boolean;
  onHide: (isOpen: boolean) => void;
  onSubmit: (name: string, hours: number) => void;
};

const CreateDedicationModal = ({ isOpen, onHide, onSubmit }: Props) => {
  let [name, setName] = useState("");
  let [hours, setHours] = useState(0);

  function closeModal() {
    onHide(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit(name, hours);
    closeModal();
    setName("");
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.Title>Dedication</Modal.Title>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <br />
          <Label>Name</Label>
          <Input
            title="Name"
            placeholder="Name"
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
          <Label>Hours</Label>
          <Input
            title="Hours"
            placeholder="Hours"
            type="number"
            value={hours || ""}
            onChange={(e) => setHours(+e.target.value)}
          />
          <Button>Save</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateDedicationModal;
