import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

function Card({image}) {
     const {serverUrl,userData,setUserData,frontendImage, setFrontedImage,backendImage, setbackendImage,selectedImage, setSelectedImage} = useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#19194e] rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-950 hover:border-4 hover:border-[black] ${selectedImage==image?"border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={()=>{
        setSelectedImage(image) 
        setbackendImage(null)
        setFrontedImage(null)

    }}>
        <img src={image} className='h-full object-cover' />
    </div>
  )
}

export default Card