import React, { Component } from 'react'
import FullLayout from '../_layouts/FullLayout'
import Navbar from '../_layouts/Navbar'
import Title from '../_layouts/Title'
import Body from './URL-Shortner/Body'

class Home extends Component {
    render() {
        return(
            <div>
                <Title title="URL Shortner"/>
                <Navbar />
                <FullLayout 
                    main={<Body />}
                />
            </div>
        )
    }
}
export default Home