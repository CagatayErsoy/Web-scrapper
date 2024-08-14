import { useGlobalContext } from "../context";
import Guides from "./Guides";
import About from "./About";
const Modal = ({ modalContent }) => {
  const { handleModal } = useGlobalContext();

  return (
    <section className="w-1/2 h-2/3 bg-[#0f1623] absolute mx-auto my-auto flex flex-col z-10 border rounded-md border-slate-500">
      {modalContent === "Guides" ? <Guides /> : null}
      {modalContent === "About" ? <About /> : null}
      <button
        className="absolute top-3 right-3 text-3lg text-slate-50"
        onClick={handleModal}
      >
        X
      </button>
    </section>
  );
};

export default Modal;
