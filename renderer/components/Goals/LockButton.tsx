import { LockContextType, useLockContext } from "../../context/LockContext";
import Button from "../core/Button";

export default function LockButton() {
  const { isLocked, setLock, endLockTime } =
    useLockContext() as LockContextType;
  const time = new Date(endLockTime).toLocaleTimeString();

  const onClick = () => {
    setLock(60);
  };

  return (
    <Button disabled={isLocked} onClick={onClick} shape={"round"}>
      Lock (unlocks at {time})
    </Button>
  );
}
