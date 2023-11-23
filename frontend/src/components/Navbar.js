import { useGlobalContext } from "../context"

 const Navbar= ({setModalContent})=>{
    const {handleModal,modal}=useGlobalContext()
    const handleClick=(e)=>{
        if(modal===false){
            console.log(e)
            handleModal(true)
            setModalContent(e)
        }
        else if(modal===true){
            setModalContent(e)
        }
    }

    return (
        <nav className="w-full h-14 bg-[#0f1623] flex justify-end gap-10 px-10 fixed top-0 left-0 right-0 shadow-md shadow-indigo-500" >
        <button className='text-lg leading-8 text-gray-300' onClick={(e)=>{
           handleClick(e.target.innerText)}}>Guides</button>
        <button className='text-lg leading-8 text-gray-300' onClick={(e)=>{
           handleClick(e.target.innerText)}}>About</button>
           </nav>
    )
  


    }

export default Navbar