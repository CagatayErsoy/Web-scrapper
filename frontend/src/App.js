import React, { useState } from "react";

import Details from "./components/Details";
import Navbar from "./components/Navbar";
import { useGlobalContext } from "./context";
import Modal from "./components/Modal";
import Title from "./components/Title";
function App() {
  const { modal } = useGlobalContext();
  const [data, setData] = useState(null);
  const [modalContent, setModalContent] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 py-16 sm:py-24 lg:py-32">
      <Navbar setModalContent={setModalContent} />
      {modal ? <Modal modalContent={modalContent} /> : ""}
      <Title />
      <Details />
    </div>
  );
}

export default App;
