import { useGlobalContext } from "../context";
import Guides from "./Guides";
import About from "./About";
import Results from "./Results";
const Modal = ({ modalContent }) => {
  const { handleModal } = useGlobalContext();

  return (
    <div className="h-full w-full bg-opacity-70 bg-grey z-10 absolute flex justify-center align-middle">
      <section className="w-1/2 h-2/3 bg-[#0f1623] absolute mx-auto my-auto flex flex-col z-20 border rounded-md border-slate-500">
        {modalContent === "Guides" ? <Guides /> : null}
        {modalContent === "About" ? <About /> : null}
        {modalContent === "Result" ? <Results /> : null}
        <button
          className="absolute top-3 right-3 text-3lg text-slate-50"
          onClick={handleModal}
        >
          X
        </button>
      </section>
    </div>
  );
};

export default Modal;
