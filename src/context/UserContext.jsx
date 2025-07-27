import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const userDataContext = createContext()
function UserContext({ children }) {
    const serverUrl = "http://localhost:8000"
    const [userData,setUserData] = useState(null);
    const [frontendImage, setFrontedImage] = useState(null)
        const [backendImage, setbackendImage] = useState(null)
        const [selectedImage, setSelectedImage] = useState(null)

    const handleCurrentUser = async ()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            setUserData(result.data)
            console.log(result.data)
        } catch (error) {
            console.error("Error fetching current user:", error);
            
        }
    }

    useEffect(() => {
        handleCurrentUser();
    }, []);



    const value = {
        serverUrl,userData,setUserData,frontendImage, setFrontedImage,backendImage, setbackendImage,selectedImage, setSelectedImage
    }
    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>

        </div>
    )
}

export default UserContext