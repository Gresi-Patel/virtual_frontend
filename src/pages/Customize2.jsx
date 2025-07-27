import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardBackspace } from "react-icons/md";

function Customize2() {
    const { userData, setUserData, backendImage, setBackendImage, selectedImage, serverUrl } = useContext(userDataContext);
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleUpdateAssistant = async () => {
        try {
            let formData = new FormData()
            formData.append("assistantName", assistantName)
            console.log(backendImage);
            if (backendImage) {
                formData.append("assistantImage", backendImage)
            }
            else {
                formData.append("imageUrl", selectedImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true })
            console.log(result.data);
            setUserData(result.data);
            setLoading(true)

        } catch (error) {
            console.log(error)

        }
    }



    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to to-[#0000ff66] flex justify-center items-center p-[20px]  flex-col relative'>
            <MdKeyboardBackspace className='absolute cursor-pointer w-[25px] h-[25px] top-[30px] left-[30px] text-white ' onClick={() => navigate("/customize")} />
            <h1 className='text-white text-[30px] text-center mb-[30px]'>Enter Your <span className='text-blue-300'>Assistant Name</span> </h1>

            <input type='text' placeholder='e.g,shifra' className='w-full max-w-[600px] h-[50px] bg-[#030326] border-2 border-[#19194e] rounded-full px-[20px] text-white outline-none text-[18px]' onChange={(e) => setAssistantName(e.target.value)} value={assistantName} />

            {assistantName &&
                <button className='min-w-[300px] h-[60px] mt-[30px] text-black bg-white font-semibold rounded-full text-[19px]' disabled={loading} onClick={() => {
                    handleUpdateAssistant()
                }
                }>{(!loading) ? "Finaly create your Assistant" : "loading.."}</button>
            }

        </div>
    )
}

export default Customize2