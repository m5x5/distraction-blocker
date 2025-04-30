import { useState } from "react";
import useSWR from "swr";
import Input from "../../core/Input";
import { updateClassification } from "./api";
import ClassificationItem from "./ClassificationItem";

const API =
  process.env.LEPTUM_API || "http://localhost:3000";

const fetcher = (url: string) => fetch(API + url).then((r) => r.json());

export default function Classification() {
  let { data: classifications } = useSWR("/classifications/list", fetcher);
  const [filter, setFilter] = useState("");
  classifications = classifications || [];

  const classifyGuess = (id: string) => (e) => {
    const value = e.target.value as
      | "Development"
      | "Study"
      | "Entertainment"
      | "System";

    updateClassification(id, value);
  };

  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex flex-col p-4">
      <h2 className="mb-4 text-2xl font-bold">Classifications</h2>
      <Input value={filter} onChange={onChangeFilter} placeholder="Filter" />
      {classifications
        ?.filter((c) =>
          c ? c.string.toLowerCase().includes(filter.toLowerCase()) : true
        )
        .map((item) => (
          <ClassificationItem
            key={item.id}
            item={item}
            onClassifyGuess={classifyGuess(item.id)}
          />
        ))}
    </div>
  );
}
