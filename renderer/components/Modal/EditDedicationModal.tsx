import { useState } from "react";
import Modal from ".";
import Button from "../core/Button";
import Input from "../core/Input";
import Label from "../core/Label";
import Select from "../core/Select";
import DedicationQuantitySelect from "../Dedications/List/Item/QuantitySelect";
import { Dedication, DraftDedication } from "../Dedications/typings";

type Props = {
  onSubmit: (dedication: DraftDedication) => void;
  onHide: (state: boolean) => void;
  dedication: Dedication;
};

export default function EditDedicationModal({
  onHide,
  onSubmit,
  dedication,
}: Props) {
  let [name, setName] = useState(dedication.name);
  let [hours, setHours] = useState(dedication.hours);
  let [tracker, setTracker] = useState(dedication.tracker);
  let [quantity, setQuantity] = useState(dedication.quantity);

  function closeModal() {
    onHide(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit({ name, hours, tracker, quantity });
    setName("");
    closeModal();
  }

  return (
    <Modal isOpen closeModal={closeModal}>
      <Modal.Title>Dedication</Modal.Title>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
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
            value={hours || 0}
            onChange={(e) => setHours(+e.target.value)}
          />
          <Label>Tracker</Label>
          <Select
            title="Tracker"
            value={tracker || ""}
            onChange={(e: any) => setTracker(e.target.value)}
          >
            <option key={"development"}>Development</option>
            <option key={"study"}>Study</option>
          </Select>
          <Label>Quantity</Label>
          <DedicationQuantitySelect
            value={quantity}
            onChange={setQuantity}
            title="Quantity"
          />

          <Button
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-100 bg-blue-700 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-blue-500"
          >
            Save
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
