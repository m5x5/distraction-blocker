import { mutate } from "swr";
import { DraftDedication } from "./typings";

const API =
  process.env.LEPTUM_API || "http://localhost:3000";

export function setDedications() {
  return [
    { id: 1, name: "Dedication 1", hours: 5 },
    { id: 2, name: "Dedication 2", hours: 7 },
  ];
}

export async function createDedication(draftDedication: DraftDedication) {
  const data = await fetch(API + "/dedications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(draftDedication),
  });
  mutate("/dedications");
  return data.json();
}

export async function editDedication(
  id: string,
  draftDedication: DraftDedication
) {
  const data = await fetch(`${API}/dedications/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(draftDedication),
  });
  mutate("/dedications");
  return data.json();
}

export async function deleteDedication(id: string) {
  const data = await fetch(`${API}/dedications/${id}`, {
    method: "DELETE",
  });
  mutate("/dedications");
  return data;
}
