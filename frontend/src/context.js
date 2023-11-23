import React, { useState, useContext,  useEffect, createContext} from 'react'
import axios from "axios";


const initialState={
    modal:true,
    url:"",
    tagName:"",
    text:"",
    className:""
}
const AppContext = createContext(initialState);
const AppProvider= ( {children} ) => {
const [state,setState]=useState(initialState)

const getData=async()=>{
    const {url,tagName,text,className}=state
    try {
        const response = await axios.post("http://localhost:3000/scrape", {
          url,
          tagName,
        });
        
      } catch (error) {
        console.error("Error scraping data:", error);
      }
  
}
const handleUrl=(url)=>{
    setState({...state,url:url})
}
const handleTag=(tag)=>{
    setState({...state, tag:tag})
}
const handleText=(text)=>{
    setState({...state,text:text})
}
const handleClassName=(className)=>{
    setState({state,className:className})
}
const handleModal=()=>{
    setState({...state, modal:!state.modal})
}

useEffect(()=>{
  getData()
},[])
  return (
    <AppContext.Provider
      value={{
        ...state,
        handleUrl,
        handleTag,
        handleClassName,
        handleText,
        getData, 
        handleModal
        
      
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a AppProvider');
  }
  return context;
};

export { AppContext, AppProvider }