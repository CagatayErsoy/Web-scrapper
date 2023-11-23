import React, { useState } from "react";

import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import Details from "./components/Details";
import Navbar from "./components/Navbar";
import { useGlobalContext } from "./context";
import Modal from "./components/Modal";
function App() {
  const {modal}=useGlobalContext()
  const [data, setData] = useState(null);
  const [modalContent, setModalContent]=useState("")
  
  console.log(modal)
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 py-16 sm:py-24 lg:py-32">
    <Navbar setModalContent={setModalContent}/>
    {modal? <Modal modalContent={modalContent}/> : ""}
      <div className="w-full max-w-2xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Web Scraper Tool
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Enter the URL of the website and select the tag to scrape data.
          </p>
        </div>
      <Details/>
      </div>
      {data && (
        <div className="w-full max-w-2xl px-6 lg:px-8 mt-10">
          <h3 className="font-bold text-white text-center">Scraped Data:</h3>
          <textarea className="leading-7 text-gray-400">
            {JSON.stringify(data, null, 2)}
          </textarea>
        </div>
      )}
    </div>
  );
}

export default App;
