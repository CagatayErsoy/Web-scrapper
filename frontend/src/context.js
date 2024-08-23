import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
  modal: false,
  modalContent: "",
  url: "",
  tag: "",
  searchText: "",
  className: "",
  subTag: "",
  result: "",
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const getData = async () => {
    const { url, tag, searchText, className, subTag } = state;
    if (!tag && !className && !subTag.length) {
      alert("Please provide at least one of tag, className, or Sub Tag.");
      return;
    } else {
      try {
        console.log("in try");
        const response = await axios.post(`${apiUrl}/scrape`, {
          url,
          tag,
          className,
          searchText,
          subTag,
        });

        console.log("Scraped Data:", response.data);
        setState({ ...state, result: response.data });
        // handleModal();
      } catch (error) {
        console.error("Error scraping data:", error);
        // handleModal();
      }
    }
  };

  const handleUrl = (url) => {
    setState({ ...state, url });
  };

  const handleTag = (tag) => {
    setState({ ...state, tag: tag });
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

  const handleSubTag = (subTag) => {
    setState({ ...state, subTag: subTag });
  };
  const handleModalContent = (content) => {
    setState({ ...state, modalContent: content, modal: !state.modal });
  };

  // const handleRemoveSubTag = (index) => {
  //   const updatedSubTags = state.subTags.filter((_, i) => i !== index);
  //   setState({ ...state, subTags: updatedSubTags });
  // };

  // const updateSubTag = (index, value) => {
  //   const updatedSubTags = state.subTags.map((tag, i) =>
  //     i === index ? value : tag
  //   );
  //   setState({ ...state, subTags: updatedSubTags });
  // };

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
        handleSubTag,
        handleModal,
        handleModalContent,

        // handleRemoveSubTag,
        // updateSubTag,
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
