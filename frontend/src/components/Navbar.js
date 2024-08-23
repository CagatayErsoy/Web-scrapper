import { useGlobalContext } from "../context";

const Navbar = () => {
  const { handleModalContent } = useGlobalContext();

  return (
    <nav className="w-full h-14 bg-[#0f1623] flex justify-end gap-10 px-10 fixed top-0 left-0 right-0 shadow-md shadow-indigo-500">
      <button
        className="text-lg leading-8 text-gray-300"
        onClick={(e) => {
          handleModalContent(e.target.innerText);
        }}
      >
        Guides
      </button>
      <button
        className="text-lg leading-8 text-gray-300"
        onClick={(e) => {
          handleModalContent(e.target.innerText);
        }}
      >
        About
      </button>
    </nav>
  );
};

export default Navbar;
