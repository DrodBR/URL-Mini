/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'
import Title from '../../_layouts/Title'

const Redirect = props => {
    const [tinyID, setTinyID] = useState(props.id);
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const getOriginalURL = new Promise((resolve, reject) => {
            var childData = ""
            const rootRef = firebase.database().ref('tinyurl')
            rootRef.orderByChild('tinyID').equalTo(tinyID).on("value", snap => {
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
            console.log(data)
            window.location.href = data
        }).catch((error) => {
            setErrorMsg(error)
            window.location.href = "https://urlmini.firebaseapp.com/"
        })
    }, []);

    let content = (
        <div>
            <Title title="Redirecting..." />
            <h1>{errorMsg}</h1>
        </div>
    )

    return content;
}
export default Redirect