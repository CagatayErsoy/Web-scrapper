import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
  modal: false,
  url: "",
  tagName: "",
  searchText: "",
  className: "",
  subTag: "",
  result: "",
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // const getData = async () => {
  //   const { url, tagName, searchText, className, subTag } = state;
  //   try {
  //     const response = await axios.post(
  //       "https://backend-dawn-waterfall-7274.fly.dev/scrape",
  //       {
  //         url,
  //         tagName,
  //         searchText,
  //         className,
  //         subTag, // Include subTags in the request if needed
  //       }
  //     );
  //     // Handle response
  //   } catch (error) {
  //     console.error("Error scraping data:", error);
  //   }
  // };
  const getData = async () => {
    const { url, tagName, searchText, className, subTag } = state;
    if (!tagName && !className && !subTag.length) {
      alert("Please provide at least one of tagName, className, or Sub Tag.");
      return;
    } else {
      try {
        console.log("in try");
        const response = await axios.post(`${apiUrl}/scrape`, {
          url,
          tagName,
          className,
          searchText,
          subTag,
        });

        console.log("Scraped Data:", response.data);
        setState({ ...state, result: response.data });
      } catch (error) {
        console.error("Error scraping data:", error);
      }
    }
  };

  const handleUrl = (url) => {
    setState({ ...state, url });
  };

  const handleTag = (tag) => {
    setState({ ...state, tagName: tag });
  };

  const handleText = (text) => {
    setState({ ...state, searchText: text });
  };

  const handleClassName = (className) => {
    setState({ ...state, className });
  };

  const handleModal = () => {
    setState({ ...state, modal: !state.modal });
  };

  const handleAddSubTag = () => {
    setState({ ...state, subTag: state.subTag });
  };

  const handleRemoveSubTag = (index) => {
    const updatedSubTags = state.subTags.filter((_, i) => i !== index);
    setState({ ...state, subTags: updatedSubTags });
  };

  const updateSubTag = (index, value) => {
    const updatedSubTags = state.subTags.map((tag, i) =>
      i === index ? value : tag
    );
    setState({ ...state, subTags: updatedSubTags });
  };

  // Empty dependency array to prevent re-fetching

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleUrl,
        handleTag,
        handleClassName,
        handleText,
        getData,
        handleModal,
        handleAddSubTag,
        handleRemoveSubTag,
        updateSubTag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a AppProvider");
  }
  return context;
};

export { AppContext, AppProvider };
