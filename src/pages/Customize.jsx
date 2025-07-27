import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img6.jpeg'
import img6 from '../assets/img7.webp'
import { MdKeyboardBackspace } from "react-icons/md";

import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Customize() {
    const { serverUrl, userData, setUserData, frontendImage, setFrontedImage, backendImage, setbackendImage, selectedImage, setSelectedImage } = useContext(userDataContext)
    const navigate = useNavigate()

    const inputImage = useRef()

    const handleImage = (e) => {
        const file = e.target.files[0]
        console.log(file);
        console.log(URL.createObjectURL(file));
        setbackendImage(file)
        setFrontedImage(URL.createObjectURL(file))

    }
    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to to-[#0000ff66] flex justify-center items-center p-[20px]  flex-col'>
            <MdKeyboardBackspace className='absolute cursor-pointer w-[25px] h-[25px] top-[30px] left-[30px] text-white ' onClick={() => navigate("/")} />
            <h1 className='text-white text-[30px] text-center mb-[30px]'>Select Your <span className='text-blue-300'>Assistant Image</span> </h1>
            <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
                <Card image={img1} />
                <Card image={img2} />
                <Card image={img3} />
                <Card image={img4} />
                <Card image={img5} />
                <Card image={img6} />
                {/* <div className='w-[150px] h-[250px] bg-[#030326] border-2 border-[#19194e] rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-950 hover:border-4 hover:border-[black] flex justify-center items-center'>
                    <RiImageAddLine className='text-white w-[25px] h-[25px]' />
                </div> */}

                <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#19194e] rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-950 hover:border-4 hover:border-[black] flex justify-center items-center ${selectedImage == "input" ? "border-4 border-white shadow-2xl shadow-blue-950" : null}`} onClick={() => {
                    inputImage.current.click()
                    setSelectedImage("input")
                }
                }>

                    {!frontendImage &&
                        <RiImageAddLine className='text-white w-[25px] h-[25px]' />}
                    {frontendImage && <img src={frontendImage} className='h-full object-cover' />}
                </div>
                <input type='file' ref={inputImage} accept='image/*' hidden onChange={handleImage} />

            </div>
            {selectedImage &&
                <button className='min-w-[150px] h-[60px] mt-[30px] text-black bg-white font-semibold rounded-full text-[19px]' onClick={()=>navigate("/customize2")}>Next</button>
            }
        </div>
    )
}

export default Customize