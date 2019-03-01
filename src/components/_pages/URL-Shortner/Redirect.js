import React, { Component } from 'react'
import * as firebase from 'firebase'
import Title from '../../_layouts/Title'

class Redirect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tinyID: this.props.id,
            errorMsg: ""
        }
    }

    componentDidMount() {
        const getOriginalURL = new Promise((resolve, reject) => {
            var childData = ""
            const rootRef = firebase.database().ref('tinyurl')
            rootRef.orderByChild('tinyID').equalTo(this.state.tinyID).on("value", snap => {
                snap.forEach(function (childSnapshot) {
                    childData = childSnapshot.val().original;
                })
                if (childData === "") {
                    reject("Url not found. Redirecting...")
                } else {
                    resolve(childData)
                }
            })
        })

        getOriginalURL.then((data) => {
            window.location.href = data
        }).catch((error) => {
            this.setState({
                errorMsg: error
            })
            window.location.href = "https://urlshortner-dr.firebaseapp.com/"
        })
    }

    render() {
        return (
            <div>
                <Title title="Redirecting..." />
                <h1>{this.state.errorMsg}</h1>
            </div>
        )
    }
}
export default Redirect