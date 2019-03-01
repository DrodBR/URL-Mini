import React, { Component } from 'react'
import * as firebase from 'firebase'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// 1 - Verify if this URL is already in database

class Body extends Component {
    constructor() {
        super()
        this.state = {
            original: "",
            tinyID: Math.random().toString(36).substring(2, 10),
            fullURL: "https://urlshortner-dr.firebaseapp.com/",
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Construct full URL
    componentDidMount() {

        // Turn on PopOver
        window.$('[data-toggle="popover"]').popover();
        window.$('.popover-dismiss').popover({ trigger: 'focus' })

        const constructFullURL = new Promise((resolve, reject) => {
            const full = this.state.fullURL + this.state.tinyID
            resolve(full)
        })
        constructFullURL.then((data) => {
            this.setState({
                fullURL: data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    componentWillUnmount() {
        document.title = "Daniel Rodrigues - Portfolio"
    }

    // Store URL in Firebase
    storeTiny(upOriginal, upTinyID) {

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
    handleSubmit(event) {
        event.preventDefault();
        this.storeTiny(this.state.original, this.state.tinyID)
        this.setState({
            submitted: true
        })
    }

    // Function used when input is inputted
    handleChange(event) {
        this.setState({ original: event.target.value })
    }

    // Require URL largest than 6
    validURL() {
        var isDisabled = true
        if (this.state.original.length > 6) {
            isDisabled = false
        }
        return isDisabled
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label>Original URL</label>
                        <input type="text" value={this.state.original} class="form-control" required="required" onChange={this.handleChange} />
                    </div>
                    <button type="submit" data-toggle="collapse" data-target="#createlink" disabled={this.validURL() || this.state.submitted} class="btn btn-secondary">Create</button>
                </form>

                <div class="collapse mt-4 mb-4 col-12 col-lg-6" id="createlink">
                    <div class="card card-body">
                        <h5 class="text-center">New Link</h5>
                        <div class="input-group">

                            <input type="text" class="form-control" value={this.state.fullURL} />
                            <CopyToClipboard text={this.state.fullURL}>
                                <div class="input-group-append">
                                    <span class="input-group-text"><a tabindex="0" class="btn btn-light" role="button" data-toggle="popover" data-trigger="focus" data-placement="top" data-content="Copied!">copy</a></span>
                                </div>
                            </CopyToClipboard>
                        </div>
                        <h5 class="text-center"><a href={this.state.fullURL} target="_blank">[open]</a></h5><hr />
                        <a class="btn btn-primary btn-sm" href="./" role="button">Create new link</a>
                    </div>  
                </div>
                <hr />
                <code>ReactJS + Firebase</code>
            </div>
        )
    }
}
export default Body