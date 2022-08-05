import { BsChevronRight, BsFillBellFill } from "react-icons/bs";

const Header = () => {
  return (
    <div
      className="flex items-center justify-between px-5 md:px-10 py-5 z-50
    bg-white shadow-md fixed top-0 w-full"
    >
      <img className="h-8 md:h-10" src="trello.png" alt="logo" />

      <div className="flex items-center gap-x-2">
        <div className="relative group cursor-pointer hidden lg:inline-block">
          <div
            className="h-[10px] w-[10px] animate-bounce bg-primary rounded-full absolute top-0 right-5 z-10
          border-2 border-white"
          />
          <BsFillBellFill className="text-2xl mr-5 text-gray-500 group-hover:text-primary transitionClass" />
        </div>

        <div className="hidden md:flex flex-col items-end">
          <span className="font-medium">Menura Adithya</span>
          <span className="text-sm text-gray-600">Developer</span>
        </div>
        <img
          className="rounded-full w-10 lg:w-12 object-contain p-[2px] border-2 border-primary"
          src="https://avatars.githubusercontent.com/u/64089619?v=4"
          alt="profile"
        />
      </div>
    </div>
  );
};

export default Header;
