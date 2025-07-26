import React from 'react'
import Card from '../components/Card'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img6.jpeg'
import img6 from '../assets/img7.webp'

function Customize() {
    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to to-[#0000ff66] flex justify-center items-center'>
            <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[20px]'>
                <Card image={img1} />
                <Card image={img2} />
                <Card image={img3} />
                <Card image={img4} />
                <Card image={img5} />
                <Card image={img6} />
            </div>
        </div>
    )
}

export default Customize