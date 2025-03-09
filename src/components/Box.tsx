import { useState } from "react";

type MainProps = {
  children: React.ReactNode;
};

const Box = ({ children }: MainProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="w-[42rem] max-w-[42rem] bg-[var(--color-background-500)] rounded-[0.9rem] overflow-scroll relative">
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "-" : "+"}</button>
      {isOpen && children}
    </div>
  );
};

export default Box;
