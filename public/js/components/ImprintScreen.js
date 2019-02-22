import React,  { Component } from "react";
import { Link } from 'react-router-dom'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

export default class ImprintScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (<div>
            <HeaderComponent/>
            <div id="wrapper">
                <div id="content-wrapper">
                    <div className="container-fluid">
                        <div className="row wow fadeIn">
                                    <div className="col-md-12 mb-4">
                                        <div className="card shadow-nohover">
                                            <div className="card-header">
                                                <h4>Legal Disclosure</h4>
                                            </div>

                                            <div className="card-body">
                                                Information in accordance with Section 5 TMG <br/>
                                                <br/>Christian Kramer<br/>Tannenbergstrasse 23<br/>34590 Wabern<br/>
                                                    <h4>Contact Information</h4>
                                                    E-Mail: <a href="mailto:ck.daill@gmail.com">ck.daill@gmail.com</a><br/>Internet address: <a href="daill.de" target="_blank">daill.de</a><br/><br/>
                                                    <h4>Disclaimer</h4>
                                                    Accountability for content<br/>
                                                    The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents'
                                                    accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for
                                                    our own content on these web pages. In this matter, please note that we are not obliged to monitor
                                                    the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity.
                                                    Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per
                                                    §§ 8 to 10 of the Telemedia Act (TMG).

                                                    <br/><br/>Accountability for links<br/>
                                                        Responsibility for the content of
                                                        external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were
                                                        evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective
                                                        link immediately.<br/><br/>Copyright<br/> Our web pages and their contents are subject to German copyright law. Unless
                                                        expressly permitted by law, every form of utilizing, reproducing or processing
                                                        works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights.
                                                        Individual reproductions of a work are only allowed for private use.
                                                        The materials from these pages are copyrighted and any unauthorized use may violate copyright laws.

                                                        <br/><br/>
                                                            <small><i>Quelle: </i><a href="http://www.translate-24h.de" target="_blank">translate-24h Deutsch-Englisch Übersetzungen</a> </small><br/><br/>
                                            </div>
                                        </div>
                            </div>
                            <div className="row wow fadeIn">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <FooterComponent/>
        </div>);
    }
}