import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { buildConfig } from '../utils/config';
import * as stores from '../stores';
import Modal from './ui/Modal';
import FileImporter from './FileImporter';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
    }

    openModal = () => {
        this.setState({ isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    saveTextAsFile = (fileNameToSaveAs, textToWrite) => {
        /* Saves a text string as a blob file*/
        let ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
            ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
            ieEDGE = navigator.userAgent.match(/Edge/g),
            ieVer = (ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));

        if (ie && ieVer < 10) {
            console.log("No blobs on IE ver<10");
            return;
        }

        let textFileAsBlob = new Blob([textToWrite], {
            type: 'text/plain'
        });

        if (ieVer > -1) {
            window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);

        } else {
            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = function (e) { document.body.removeChild(e.target); };
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    };

    download = () => {

        const { changeCurrentQuestion } = stores.componentStore;
        const { questions, indexOfFirstQuestionErrors } = stores.questionStore;
        const { design, customerLogo } = stores.designStore;
        const { showOnlySelectedCategoryTagInHitlist, sentimentRange } = stores.otherStore;

        if (indexOfFirstQuestionErrors >= 0) {
            alert('You have some errors in the configuration!');
            changeCurrentQuestion(indexOfFirstQuestionErrors);
            return;
        }

        const textConfig = buildConfig({
            questions: questions,
            design: design,
            otherParams: {
                customerLogo: customerLogo,
                showOnlySelectedCategoryTagInHitlist: showOnlySelectedCategoryTagInHitlist,
                sentimentRange: sentimentRange
            }
        });

        this.saveTextAsFile('TAConfig.js', textConfig);
    };

    render() {
        return (
            <div>
                <div className='navbar'>
                    <Link to="/" className="navbar__item">Design</Link>
                    <Link to="/text" className="navbar__item">Text editor</Link>
                    <button className="green-button navbar_download-btn" onClick={this.download} title="Download configuration as JS file">
                        Download configuration
                    </button>
                    <button className="green-button navbar_download-btn" title="Import your configuration from file" onClick={this.openModal}>
                        Import file
                    </button>
                </div>
                <Modal isOpen={this.state.isModalOpen} title="Import file" onClose={() => this.closeModal()}>
                    <FileImporter />
                </Modal>
            </div>
        )
    }
};

export default NavBar;