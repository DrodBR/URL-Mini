import React, { Component } from 'react'
import { Link } from 'react-router-dom'
 
class Navbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <Link class="navbar-brand" to="/">URL Shortner - Daniel Rodrigues</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                </div>
            </nav>
        );
    }
}
export default Navbar;