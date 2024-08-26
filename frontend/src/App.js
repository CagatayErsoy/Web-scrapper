import React, { useState } from "react";

import Details from "./components/Details";
import Navbar from "./components/Navbar";
import { useGlobalContext } from "./context";
import Modal from "./components/Modal";
import Title from "./components/Title";
function App() {
  // const { modal } = useGlobalContext();
  // console.log("Modal State:", modal);
  return (
    <div className="flex flex-col items-center h-full w-full bg-gray-900 py-16 sm:py-24 lg:py-32 absolute">
      <Navbar />
      {<Modal />}
      <Title />
      <Details />
    </div>
  );
}

export default App;
