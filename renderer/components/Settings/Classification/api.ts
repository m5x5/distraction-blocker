import { mutate } from "swr";

const API =
  process.env.LEPTUM_API || "http://localhost:3000";

type Classification = {
  id: string;
  string: string;
  classification: string;
  status: "confirmed" | "guessed";
};

export const listClassifications = async (): Promise<Classification> => {
  const data = await fetch(API + "/classifications/list");
  const json = await data.json();
  return json;
};

export const updateClassification = async (
  id: string,
  classification: string
): Promise<void> => {
  await fetch(API + "/classifications/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      classification,
    }),
  });

  mutate("/classifications/list");
};

export const reclassifyClassification = async (
  id: string,
  string: string
): Promise<void> => {
  await fetch(API + "/classifications/reclassify/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ string }),
  });
  mutate("/classifications/list");
};

export const promoteToExample = async (id: string): Promise<void> => {
  await fetch(API + "/classifications/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      status: "example",
    }),
  });

  mutate("/classifications/list");
};

export const getClassification = async (
  string: string
): Promise<Classification> => {
  const data = await fetch(API + "/classifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      string,
    }),
  });

  const json = await data.json();

  mutate("/classifications/list");
  return json;
};
