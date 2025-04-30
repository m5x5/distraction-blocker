import { useState } from "react";
import Input from "../../core/Input";
import Label from "../../core/Label";
import Modal from "../../Modal";

export default function CreateGoalModal({ onSubmit, onClose }) {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <Modal closeModal={onClose} isOpen>
      <Modal.Title>Create Goal</Modal.Title>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Label>Name</Label>
          <Input value={name} onChange={handleNameChange} />
        </form>
      </Modal.Body>
    </Modal>
  );
}
