import React from 'react'
import FullLayout from '../_layouts/FullLayout'
import Navbar from '../_layouts/Navbar'
import Title from '../_layouts/Title'
import Body from './URL-Mini/Body'

const Home = () => {
    return (
        <div>
            <Title title="URL Mini" />
            <Navbar />
            <FullLayout
                main={<Body />}
            />
        </div>
    )
}
export default Home