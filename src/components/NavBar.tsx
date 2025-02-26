import Logo from "./Logo";
import NumResults from "./NumResults";
import Search from "./Search";

const NavBar = () => {
  return (
    <div className="grid grid-cols-3 items-center h-[7.2rem] px-[3.2rem] bg-primary rounded-[0.9rem] ">
      <Logo />
      <Search />
      <NumResults />
    </div>
  );
};

export default NavBar;
