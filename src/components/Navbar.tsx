import { ReactNode } from "react";
import Logo from "./Logo";


interface NavbarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  return (
    <div className="grid grid-cols-3 items-center h-[7.2rem] px-[3.2rem] bg-primary rounded-[0.9rem] ">
      <Logo />
      {children}
    </div>
  );
};

export default Navbar;
