import { useGlobalContext } from "../context";
import Guides from "./Guides";
import About from "./About";
import Results from "./Results";
import { useEffect, useState } from "react";

const Modal = () => {
  const { handleModal, modal, modalContent } = useGlobalContext();
  const [content, setContent] = useState(null);
  useEffect(() => {
    switch (modalContent) {
      case "Guides":
        setContent(<Guides />);
        break;
      case "About":
        setContent(<About />);
        break;
      case "Results":
        setContent(<Results />);
        break;
      default:
        setContent(null);
    }
  }, [modal]);
  if (!modal) return null; // Don't render the modal if it's not active

  return (
    <div className="h-full w-full bg-opacity-70 bg-grey z-10 absolute flex justify-center items-center">
      <section className="w-1/2 h-2/3 bg-[#0f1623] mx-auto my-auto flex flex-col z-20 border rounded-md border-slate-500 relative">
        {content}
        <button
          className="absolute top-3 right-3 text-3lg text-slate-50"
          onClick={handleModal} // Corrected to pass the function instead of calling it immediately
        >
          X
        </button>
      </section>
    </div>
  );
};

export default Modal;
