import { createContext, useContext } from "react";
import useSWR, { mutate } from "swr";
import { getHeaders } from "../utils/api";

const API =
  process.env.LEPTUM_API || "http://localhost:3000";
const fetcher = (url: string) => fetch(API + url).then((r) => r.json());

export type LockContextType = {
  isLocked: boolean;
  timeTillUnlock: number;
  setLock: (minutes: number) => Promise<void>;
  endLockTime: number;
};

const LockContext = createContext<Partial<LockContextType>>({});

export function useLockContext() {
  return useContext(LockContext);
}

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function LockContextProvider({ children }: Props) {
  const { data } = useSWR("/settings", fetcher);

  let timeTillUnlock = 0;
  let isLocked = false;

  if (data?.endLockTime) {
    const endLockTime = new Date(data.endLockTime);
    const now = new Date();
    timeTillUnlock = Math.max(0, endLockTime.getTime() - now.getTime());
    isLocked = timeTillUnlock > 0;
  }

  const setLock = async (minutes = 60) => {
    const MINUTE_IN_MS = 60 * 1000;
    const headers = await getHeaders();
    const res = await fetch(API + "/settings/61f5418c1f37497aa88b06ed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        endLockTime: "" + +new Date(Date.now() + minutes * MINUTE_IN_MS),
      }),
    });

    const data = await res.json();

    mutate("/settings", data);
  };

  return (
    <LockContext.Provider
      value={{
        isLocked,
        timeTillUnlock,
        setLock,
        endLockTime: data?.endLockTime,
      }}
    >
      {children}
    </LockContext.Provider>
  );
}
