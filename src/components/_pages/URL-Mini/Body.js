/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Body = props => {

    const [original, setOriginal] = useState('')
    const [tinyID, setTinyID] = useState(Math.random().toString(36).substring(2, 10))
    const [fullURL, setFullURL] = useState('https://urlmini.firebaseapp.com/')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        turnOnPopover()
        buildCompleteURL()
    }, [])

    const turnOnPopover = () => {
        window.$('[data-toggle="popover"]').popover();
        window.$('.popover-dismiss').popover({ trigger: 'focus' })
    }

    const buildCompleteURL = () => {
        const buildURL = new Promise((resolve, reject) => {
            const full = fullURL + tinyID
            resolve(full)
        })
        buildURL.then((data) => {
            setFullURL(data)
        }).catch(err => {
            console.log(err);
        })
    }

    const storeTiny = (upOriginal, upTinyID) => {
        // Fix prefix, if necessary        
        var prefix = "http://"
        var prefixs = "https://"
        if (upOriginal.substr(0, prefix.length) !== prefix) {
            if (upOriginal.substr(0, prefixs.length) !== prefixs) {
                upOriginal = prefix + upOriginal
            }
        }
        // Store URL in Firebase
        firebase.database().ref('tinyurl').push({
            original: upOriginal,
            tinyID: upTinyID
        })
    }

    // Function used when submit button is pressed
    const handleSubmit = (event) => {
        event.preventDefault();
        storeTiny(original, tinyID)
        setSubmitted(true)
    }

    // Function used when input is inputted
    const handleChange = (event) => {
        setOriginal(event.target.value)
    }

    // Require URL largest than 6
    const validURL = () => {
        var isDisabled = true
        if (original.length > 6) {
            isDisabled = false
        }
        return isDisabled
    }

    let content = (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label>Original URL</label>
                    <input type="text" value={original} class="form-control" required="required" onChange={handleChange} />
                </div>
                <button type="submit" data-toggle="collapse" data-target="#createlink" disabled={validURL() || submitted} class="btn btn-secondary">Create</button>
            </form>
            <div class="d-flex justify-content-center">
                <div class="collapse mt-4 mb-4 col-12 col-lg-6" id="createlink">
                    <div class="card card-body">
                        <h5 class="text-center">New Link</h5>
                        <div class="input-group">

                            <input type="text" class="form-control" value={fullURL} />
                            <CopyToClipboard text={fullURL}>
                                <div class="input-group-append">
                                    <span class="input-group-text"><a tabindex="0" class="btn btn-light" role="button" data-toggle="popover" data-trigger="focus" data-placement="top" data-content="Copied!">copy</a></span>
                                </div>
                            </CopyToClipboard>
                        </div>
                        <h5 class="text-center"><a href={fullURL} target="_blank" rel="noopener noreferrer">[open]</a></h5><hr />
                        <a class="btn btn-primary btn-sm" href="./" role="button">Create new link</a>
                    </div>
                </div>
            </div>
            <hr />
            <code>ReactJS + Firebase</code>
        </div>
    )

    return content;
}
export default Body