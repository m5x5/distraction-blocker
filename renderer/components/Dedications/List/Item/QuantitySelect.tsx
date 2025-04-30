import { useState } from "react";
import Select from "../../../core/Select";

type Props = {
  onChange: (value: number) => void;
  value: number;
  title: string;
};

export default function DedicationQuantitySelect({
  onChange,
  value,
  title,
}: Props) {
  const [quantity, setQuantity] = useState(value);
  const handleChange = (value: number) => {
    setQuantity(value);
    onChange(value);
  };
  return (
    <Select
      value={quantity}
      onChange={(e) => handleChange(+e.target.value)}
      title={title}
    >
      <option value={1}>Once a week</option>
      <option value={2}>Twice a week</option>
      <option value={3}>Three times a week</option>
      <option value={4}>Four times a week</option>
      <option value={5}>Five times a week</option>
      <option value={6}>Six times a week</option>
      <option value={7}>Every day</option>
    </Select>
  );
}
