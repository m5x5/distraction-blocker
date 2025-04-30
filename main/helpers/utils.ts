import fs from "fs";

export default function getJSONFromFile(file: string) {
  // Check if file exists
  if (!fs.existsSync(file)) {
    return [];
  }
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data): void => {
      if (err) reject(err);
      resolve(JSON.parse(data.toString()));
    });
  });
}

export function removeDuplicates<T>(data: T): T | [] {
  if (!Array.isArray(data)) return [];
  return data.reduce((acc, [key, value]) => {
    if (!acc.some(([k]) => k === key)) {
      acc.push([key, value]);
    }
    return acc;
  }, [] as T[]);
}
