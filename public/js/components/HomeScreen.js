import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import {getAllItems, getItemsByTerm} from '../actions/itemsAction';
import '../../ext/js/bootstrap';


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.suggestions = [];

    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextProps.items.data) {
            this.suggestions = [];
            for(let i = 0; i < nextProps.items.data.length; i++) {
                this.suggestions.push(<li>{nextProps.items.data[i].name}</li>);
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount() {

    }


    onInput(text) {
        this.props.dispatch(getItemsByTerm(text))
    }

    render() {
        return (<div>
            <header>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
                    <div className="container-fluid">
                        <a className="navbar-brand waves-effect" href="https://mdbootstrap.com/docs/jquery/" target="_blank">
                            <strong className="blue-text">MDB</strong>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link waves-effect" href="#">Home
                                        <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link waves-effect" href="https://mdbootstrap.com/docs/jquery/" target="_blank">About
                                        MDB</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link waves-effect" href="https://mdbootstrap.com/docs/jquery/getting-started/download/"
                                       target="_blank">Free
                                        download</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link waves-effect" href="https://mdbootstrap.com/education/bootstrap/" target="_blank">Free
                                        tutorials</a>
                                </li>
                            </ul>

                            <ul className="navbar-nav nav-flex-icons">
                                <li className="nav-item">
                                    <a href="https://www.facebook.com/mdbootstrap" className="nav-link waves-effect" target="_blank">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://twitter.com/MDBootstrap" className="nav-link waves-effect" target="_blank">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design" className="nav-link border border-light rounded waves-effect"
                                       target="_blank">
                                        <i className="fab fa-github mr-2"></i>MDB GitHub
                                    </a>
                                </li>
                            </ul>

                        </div>

                    </div>
                </nav>
            </header>
        

        
        <main className="pt-5 mx-lg-5">
            <div className="container-fluid mt-5">
                <div className="card mb-4 wow fadeIn">
                    <div className="card-body d-sm-flex justify-content-between">
                        <h4 className="mb-2 mb-sm-0 pt-1">
                            <a href="https://mdbootstrap.com/docs/jquery/" target="_blank">Home Page</a>
                            <span>/</span>
                            <span>Dashboard</span>
                        </h4>

                        <form className="d-flex justify-content-center">
                            <input type="search" placeholder="Type your query" aria-label="Search" className="form-control" />
                                <button className="btn btn-primary btn-sm my-0 p" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                        </form>

                    </div>

                </div>
                
                <div className="row wow fadeIn">
                    <div className="col-md-9 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <input type="text" onChange={(e) => {this.onInput(e.target.value)}} className="form-control" id="searchItem" placeholder="Search item"/>
                                <ul>
                                    {this.suggestions}
                                </ul>
                            </div>
                        </div>
                    </div>
                    

                    
                    <div className="col-md-3 mb-4">

                        
                        <div className="card mb-4">

                            
                            <div className="card-header text-center">
                                Pie chart
                            </div>

                            
                            <div className="card-body">

                                <canvas id="pieChart"></canvas>

                            </div>

                        </div>
                        

                        
                        <div className="card mb-4">

                            
                            <div className="card-body">

                                
                                <div className="list-group list-group-flush">
                                    <a className="list-group-item list-group-item-action waves-effect">Sales
                                        <span className="badge badge-success badge-pill pull-right">22%
                    <i className="fas fa-arrow-up ml-1"></i>
                  </span>
                                    </a>
                                    <a className="list-group-item list-group-item-action waves-effect">Traffic
                                        <span className="badge badge-danger badge-pill pull-right">5%
                    <i className="fas fa-arrow-down ml-1"></i>
                  </span>
                                    </a>
                                    <a className="list-group-item list-group-item-action waves-effect">Orders
                                        <span className="badge badge-primary badge-pill pull-right">14</span>
                                    </a>
                                    <a className="list-group-item list-group-item-action waves-effect">Issues
                                        <span className="badge badge-primary badge-pill pull-right">123</span>
                                    </a>
                                    <a className="list-group-item list-group-item-action waves-effect">Messages
                                        <span className="badge badge-primary badge-pill pull-right">8</span>
                                    </a>
                                </div>
                                

                            </div>

                        </div>
                        

                    </div>
                    

                </div>
                

                
                <div className="row wow fadeIn">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-hover">
                                    <thead className="blue-grey lighten-4">
                                    <tr>
                                        <th>#</th>
                                        <th>Lorem</th>
                                        <th>Ipsum</th>
                                        <th>Dolor</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Cell 1</td>
                                        <td>Cell 2</td>
                                        <td>Cell 3</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Cell 4</td>
                                        <td>Cell 5</td>
                                        <td>Cell 6</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Cell 7</td>
                                        <td>Cell 8</td>
                                        <td>Cell 9</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-hover">
                                    
                                    <thead className="blue lighten-4">
                                    <tr>
                                        <th>#</th>
                                        <th>Lorem</th>
                                        <th>Ipsum</th>
                                        <th>Dolor</th>
                                    </tr>
                                    </thead>
                                    

                                    
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Cell 1</td>
                                        <td>Cell 2</td>
                                        <td>Cell 3</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Cell 4</td>
                                        <td>Cell 5</td>
                                        <td>Cell 6</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Cell 7</td>
                                        <td>Cell 8</td>
                                        <td>Cell 9</td>
                                    </tr>
                                    </tbody>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row wow fadeIn">
                    <div className="col-lg-6 col-md-6 mb-4">
                        <div className="card">
                            <div className="card-header">Line chart</div>
                            <div className="card-body">
                                <canvas id="lineChart"></canvas>

                            </div>

                        </div>
                        

                    </div>
                    

                    
                    <div className="col-lg-6 col-md-6 mb-4">

                        
                        <div className="card">

                            
                            <div className="card-header">Radar Chart</div>

                            
                            <div className="card-body">

                                <canvas id="radarChart"></canvas>

                            </div>

                        </div>
                        

                    </div>
                    

                    
                    <div className="col-lg-6 col-md-6 mb-4">

                        
                        <div className="card">

                            
                            <div className="card-header">Doughnut Chart</div>

                            
                            <div className="card-body">

                                <canvas id="doughnutChart"></canvas>

                            </div>

                        </div>
                        

                    </div>
                    

                    
                    <div className="col-lg-6 col-md-6 mb-4">

                        
                        <div className="card">

                            
                            <div className="card-header">Horizontal Bar Chart</div>

                            
                            <div className="card-body">

                                <canvas id="horizontalBar"></canvas>

                            </div>

                        </div>
                        

                    </div>
                    
                </div>
                

                
                <div className="row wow fadeIn">

                    
                    <div className="col-md-6 mb-4">

                        
                        <div className="card">

                            
                            <div className="card-header">Google map</div>

                            
                            <div className="card-body">
                                
                                <div id="map-container-google-2" className="z-depth-1-half map-container" style={{height: '500px'}}>
                                    <iframe src="https://maps.google.com/maps?q=chicago&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0"
                                            style={{border: 0}} allowFullScreen></iframe>
                                </div>

                                

                            </div>

                        </div>
                        

                    </div>
                    

                    
                    <div className="col-md-6 mb-4">

                        
                        <div className="card">

                            
                            <section>

                                
                                <div className="modal fade top" id="frameModalTopInfoDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-frame modal-top modal-notify modal-info" role="document">
                                        
                                        <div className="modal-content">
                                            
                                            <div className="modal-body">
                                                <div className="row d-flex justify-content-center align-items-center">

                                                    <p className="pt-3 pr-2">Lorem ipsum dolor sit amet, consectetur
                                                        adipisicing elit. Impedit nisi quo
                                                        provident fugiat reprehenderit nostrum quos..</p>

                                                    <a role="button" className="btn btn-info">Get it now
                                                        <i className="far fa-gem ml-1"></i>
                                                    </a>
                                                    <a role="button" className="btn btn-outline-info waves-effect" data-dismiss="modal">No,
                                                        thanks</a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade bottom" id="frameModalBottomSuccessDemo" tabIndex="-1" role="dialog"
                                     aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-frame modal-bottom modal-notify modal-success" role="document">
                                        
                                        <div className="modal-content">
                                            
                                            <div className="modal-body">
                                                <div className="row d-flex justify-content-center align-items-center">

                                                    <p className="pt-3 pr-2">Lorem ipsum dolor sit amet, consectetur
                                                        adipisicing elit. Impedit nisi quo
                                                        provident fugiat reprehenderit nostrum quos..</p>

                                                    <a role="button" className="btn btn-success">Get it now
                                                        <i className="far fa-gem ml-1"></i>
                                                    </a>
                                                    <a role="button" className="btn btn-outline-success waves-effect" data-dismiss="modal">No, thanks</a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade right" id="sideModalTRSuccessDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-side modal-top-right modal-notify modal-success" role="document">
                                        
                                        <div className="modal-content">
                                            
                                            <div className="modal-header">
                                                <p className="heading lead">Modal Success</p>

                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            
                                            <div className="modal-body">
                                                <div className="text-center">
                                                    <i className="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
                                                        iusto nulla
                                                        aperiam blanditiis ad consequatur in dolores culpa, dignissimos,
                                                        eius
                                                        non possimus fugiat. Esse ratione fuga, enim, ab officiis totam.
                                                    </p>
                                                </div>
                                            </div>

                                            
                                            <div className="modal-footer justify-content-center">
                                                <a role="button" className="btn btn-success">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-success waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade left" id="sideModalTLInfoDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-side modal-top-left modal-notify modal-info" role="document">
                                        
                                        <div className="modal-content">
                                            
                                            <div className="modal-header">
                                                <p className="heading lead">Modal Info</p>

                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            
                                            <div className="modal-body">

                                                <img src="https://mdbootstrap.com/wp-content/uploads/2016/11/admin-dashboard-bootstrap.jpg" alt="Material Design for Bootstrap - dashboard" className="img-fluid" />

                                                    <div className="text-center">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
                                                            vero illo
                                                            error eveniet cum.
                                                        </p>
                                                    </div>
                                            </div>

                                            
                                            <div className="modal-footer justify-content-center">
                                                <a role="button" className="btn btn-info">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-info waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade right" id="sideModalBRDangerDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-side modal-bottom-right modal-notify modal-danger" role="document">
                                        
                                        <div className="modal-content">
                                            
                                            <div className="modal-header">
                                                <p className="heading">Modal Danger</p>

                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            
                                            <div className="modal-body">

                                                <div className="row">
                                                    <div className="col-3">
                                                        <p></p>
                                                        <p className="text-center">
                                                            <i className="fas fa-shopping-cart fa-4x"></i>
                                                        </p>
                                                    </div>

                                                    <div className="col-9">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
                                                            molestiae
                                                            provident temporibus sunt earum.</p>
                                                        <h2>
                                                            <span className="badge">v52gs1</span>
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            <div className="modal-footer justify-content-center">
                                                <a role="button" className="btn btn-danger">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-danger waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade left" id="sideModalBLWarningDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-side modal-bottom-left modal-notify modal-warning" role="document">
                                        
                                        <div className="modal-content">
                                            
                                            <div className="modal-header">
                                                <p className="heading">Modal Warning</p>

                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            
                                            <div className="modal-body">

                                                <div className="row">
                                                    <div className="col-3 text-center">
                                                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg" alt="Michal Szymanski - founder of Material Design for Bootstrap"
                                                             className="img-fluid z-depth-1-half rounded-circle" />
                                                            <div style={{height: '10px'}}></div>
                                                            <p className="title mb-0">Jane</p>
                                                            <p className="text-muted " style={{fontSize: '13px'}}>Consultant</p>
                                                    </div>

                                                    <div className="col-9">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
                                                            molestiae
                                                            provident temporibus sunt earum.</p>
                                                        <p className="card-text">
                                                            <strong>Lorem ipsum dolor sit amet, consectetur adipisicing
                                                                elit.</strong>
                                                        </p>
                                                    </div>
                                                </div>


                                            </div>

                                            
                                            <div className="modal-footer justify-content-center">
                                                <a role="button" className="btn btn-warning">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-warning waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade" id="modalLoginAvatarDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog cascading-modal modal-avatar modal-sm" role="document">
                                        
                                        <div className="modal-content">

                                            
                                            <div className="modal-header">
                                                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%281%29.jpg" className="rounded-circle img-responsive"
                                                     alt="Avatar photo" />
                                            </div>
                                            
                                            <div className="modal-body text-center mb-1">

                                                <h5 className="mt-1 mb-2">Maria Doe</h5>

                                                <div className="md-form ml-0 mr-0">
                                                    <input type="password" type="text" id="form1" className="form-control ml-0" />
                                                        <label htmlFor="form1" className="ml-0">Enter password</label>
                                                </div>

                                                <div className="text-center mt-4">
                                                    <button className="btn btn-cyan">Login
                                                        <i className="fas fa-sign-in-alt ml-1"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade" id="modalLRFormDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                ...
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade" id="centralModalLGInfoDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-notify modal-info" role="document">
                                        
                                        <div className="modal-content">
                                            
                                            <div className="modal-header">
                                                <p className="heading lead">Modal Info</p>

                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            
                                            <div className="modal-body">
                                                <div className="text-center">
                                                    <i className="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
                                                        iusto nulla
                                                        aperiam blanditiis ad consequatur in dolores culpa, dignissimos,
                                                        eius
                                                        non possimus fugiat. Esse ratione fuga, enim, ab officiis totam.
                                                    </p>
                                                </div>
                                                <img src="https://mdbootstrap.com/wp-content/uploads/2016/11/admin-dashboard-bootstrap.jpg" alt="Material Design for Bootstrap - dashboard"
                                                     className="img-fluid" />

                                            </div>

                                            
                                            <div className="modal-footer">
                                                <a role="button" className="btn btn-info">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-info waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade" id="centralModalFluidSuccessDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog modal-fluid modal-notify modal-success" role="document">
                                        
                                        <div className="modal-content">
                                            
                                            <div className="modal-header">
                                                <p className="heading lead">Modal Success</p>

                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            
                                            <div className="modal-body">
                                                <div className="text-center">
                                                    <i className="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
                                                        iusto nulla
                                                        aperiam blanditiis ad consequatur in dolores culpa, dignissimos,
                                                        eius
                                                        non possimus fugiat. Esse ratione fuga, enim, ab officiis totam.
                                                    </p>
                                                </div>
                                                <ul className="list-group z-depth-0">
                                                    <li className="list-group-item justify-content-between">
                                                        Cras justo odio
                                                        <span className="badge badge-primary badge-pill">14</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Dapibus ac facilisis in
                                                        <span className="badge badge-primary badge-pill">2</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Morbi leo risus
                                                        <span className="badge badge-primary badge-pill">1</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Cras justo odio
                                                        <span className="badge badge-primary badge-pill">14</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Dapibus ac facilisis in
                                                        <span className="badge badge-primary badge-pill">2</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Morbi leo risus
                                                        <span className="badge badge-primary badge-pill">1</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            
                                            <div className="modal-footer">
                                                <a role="button" className="btn btn-success">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-success waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade right" id="fluidModalRightSuccessDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-full-height modal-right modal-notify modal-success" role="document">
                                        
                                        <div className="modal-content">
                                            
                                            <div className="modal-header">
                                                <p className="heading lead">Modal Success</p>

                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            
                                            <div className="modal-body">
                                                <div className="text-center">
                                                    <i className="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
                                                        iusto nulla
                                                        aperiam blanditiis ad consequatur in dolores culpa, dignissimos,
                                                        eius
                                                        non possimus fugiat. Esse ratione fuga, enim, ab officiis totam.
                                                    </p>
                                                </div>
                                                <ul className="list-group z-depth-0">
                                                    <li className="list-group-item justify-content-between">
                                                        Cras justo odio
                                                        <span className="badge badge-primary badge-pill">14</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Dapibus ac facilisis in
                                                        <span className="badge badge-primary badge-pill">2</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Morbi leo risus
                                                        <span className="badge badge-primary badge-pill">1</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Cras justo odio
                                                        <span className="badge badge-primary badge-pill">14</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Dapibus ac facilisis in
                                                        <span className="badge badge-primary badge-pill">2</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Morbi leo risus
                                                        <span className="badge badge-primary badge-pill">1</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            
                                            <div className="modal-footer justify-content-center">
                                                <a role="button" className="btn btn-success">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-success waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div className="modal fade left" id="fluidModalLeftInfoDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-full-height modal-left modal-notify modal-info" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <p className="heading lead">Modal Success</p>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            <div className="modal-body">
                                                <div className="text-center">
                                                    <i className="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
                                                        iusto nulla
                                                        aperiam blanditiis ad consequatur in dolores culpa, dignissimos,
                                                        eius
                                                        non possimus fugiat. Esse ratione fuga, enim, ab officiis totam.
                                                    </p>
                                                </div>
                                                <ul className="list-group z-depth-0">
                                                    <li className="list-group-item justify-content-between">
                                                        Cras justo odio
                                                        <span className="badge badge-primary badge-pill">14</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Dapibus ac facilisis in
                                                        <span className="badge badge-primary badge-pill">2</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Morbi leo risus
                                                        <span className="badge badge-primary badge-pill">1</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Cras justo odio
                                                        <span className="badge badge-primary badge-pill">14</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Dapibus ac facilisis in
                                                        <span className="badge badge-primary badge-pill">2</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Morbi leo risus
                                                        <span className="badge badge-primary badge-pill">1</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            
                                            <div className="modal-footer justify-content-center">
                                                <a role="button" className="btn btn-info">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-info waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="modal fade top" id="fluidModalTopWarningDemo" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                                     aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-full-height modal-top modal-notify modal-warning" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <p className="heading lead">Modal Warning</p>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            
                                            <div className="modal-body">
                                                <div className="text-center">
                                                    <i className="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                                                </div>
                                                <ul className="list-group z-depth-0">
                                                    <li className="list-group-item justify-content-between">
                                                        Cras justo odio
                                                        <span className="badge badge-primary badge-pill">14</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Dapibus ac facilisis in
                                                        <span className="badge badge-primary badge-pill">2</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Morbi leo risus
                                                        <span className="badge badge-primary badge-pill">1</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <div className="modal-footer">
                                                <a role="button" className="btn btn-warning">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-warning waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                                
                                <div className="modal fade bottom" id="fluidModalBottomDangerDemo" tabIndex="-1" role="dialog"
                                     aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
                                    <div className="modal-dialog modal-full-height modal-bottom modal-notify modal-danger" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <p className="heading lead">Modal Danger</p>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="white-text">&times;</span>
                                                </button>
                                            </div>

                                            
                                            <div className="modal-body">
                                                <div className="text-center">
                                                    <i className="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                                                </div>
                                                <ul className="list-group z-depth-0">
                                                    <li className="list-group-item justify-content-between">
                                                        Cras justo odio
                                                        <span className="badge badge-primary badge-pill">14</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Dapibus ac facilisis in
                                                        <span className="badge badge-primary badge-pill">2</span>
                                                    </li>
                                                    <li className="list-group-item justify-content-between">
                                                        Morbi leo risus
                                                        <span className="badge badge-primary badge-pill">1</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            
                                            <div className="modal-footer">
                                                <a role="button" className="btn btn-danger">Get it now
                                                    <i className="far fa-gem ml-1"></i>
                                                </a>
                                                <a role="button" className="btn btn-outline-danger waves-effect" data-dismiss="modal">No,
                                                    thanks</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                            </section>
                            

                            
                            <div className="card-header">Modals</div>
                            <div className="card-body">
                                <div className="text-center mb-5">
                                    <p className="lead">Click buttons below to launch modals demo</p>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5 className="text-center mb-3">Frame Modal</h5>
                                        <img src="https://mdbootstrap.com/img/brandflow/modal4.jpg" alt="MDB graphics" className="img-fluid z-depth-1" />
                                            <div className="text-center">
                                                <h5 className="my-3">Position</h5>

                                                <a className="btn btn-primary btn-sm" data-toggle="modal" data-target="#frameModalTopInfoDemo"
                                                   data-backdrop="false">Top</a>
                                                <br />
                                                    <a className="btn btn-primary btn-sm" data-toggle="modal" data-target="#frameModalBottomSuccessDemo"
                                                       data-backdrop="false">Bottom</a>
                                            </div>
                                    </div>
                                    
                                    <div className="col-md-3">
                                        <h5 className="text-center mb-3">Side Modal</h5>
                                        <img src="https://mdbootstrap.com/img/brandflow/modal3.jpg" alt="MDB graphics" className="img-fluid z-depth-1" />
                                            <div className="text-center">
                                                <h5 className="my-3">Position</h5>
                                                <a className="btn btn-primary btn-sm" data-toggle="modal" data-target="#sideModalTRSuccessDemo"
                                                   data-backdrop="false">Top Right</a>
                                                <br/>
                                                    <a className="btn btn-primary btn-sm" data-toggle="modal" data-target="#sideModalTLInfoDemo">Top
                                                        Left</a>
                                                    <br/>
                                                        <a className="btn btn-primary btn-sm" data-toggle="modal" data-target="#sideModalBRDangerDemo">Bottom Right</a>
                                                        <br/>
                                                        <a className="btn btn-primary btn-sm" data-toggle="modal" data-target="#sideModalBLWarningDemo">Bottom Left</a>
                                            </div>
                                    </div>
                                    

                                    
                                    <div className="col-md-3">
                                        <h5 className="text-center mb-3">Central Modal</h5>
                                        <img src="https://mdbootstrap.com/img/brandflow/modal2.jpg" alt="MDB graphics" className="img-fluid z-depth-1" />
                                            <div className="text-center">
                                                <h5 className="my-3">Size</h5>

                                                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalLoginAvatarDemo">Small
                                                </button>
                                                <br/>
                                                    <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalLRFormDemo">Medium
                                                    </button>
                                                    <br/>
                                                        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#centralModalLGInfoDemo">Large
                                                        </button>
                                                        <br/>
                                                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#centralModalFluidSuccessDemo">Fluid
                                                            </button>
                                            </div>
                                    </div>
                                    

                                    
                                    <div className="col-md-3">
                                        <h5 className="text-center mb-3">Fluid Modal</h5>

                                        <img src="https://mdbootstrap.com/img/brandflow/modal1.jpg" alt="MDB graphics" className="img-fluid z-depth-1" />
                                            <div className="text-center">
                                                <h5 className="my-3">Position</h5>

                                                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#fluidModalRightSuccessDemo">Right</button>
                                                <br/>
                                                    <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#fluidModalLeftInfoDemo">Left</button>
                                                    <br/>
                                                        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#fluidModalTopWarningDemo">Top</button>
                                                        <br/>
                                                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#fluidModalBottomDangerDemo">Bottom</button>
                                            </div>
                                    </div>
                                    

                                </div>
                                

                            </div>

                        </div>
                        

                    </div>
                    

                </div>
                

            </div>
        </main>

            <footer className="page-footer text-center font-small primary-color-dark darken-2 mt-4 wow fadeIn">
                <div className="pt-4">
                    <a className="btn btn-outline-white" href="https://mdbootstrap.com/docs/jquery/getting-started/download/" target="_blank"
                       role="button">Download
                        MDB
                        <i className="fas fa-download ml-2"></i>
                    </a>
                    <a className="btn btn-outline-white" href="https://mdbootstrap.com/education/bootstrap/" target="_blank" role="button">Start
                        free tutorial
                        <i className="fas fa-graduation-cap ml-2"></i>
                    </a>
                </div>

                <hr className="my-4" />
                    <div className="pb-4">
                        <a href="https://www.facebook.com/mdbootstrap" target="_blank">
                            <i className="fab fa-facebook-f mr-3"></i>
                        </a>

                        <a href="https://twitter.com/MDBootstrap" target="_blank">
                            <i className="fab fa-twitter mr-3"></i>
                        </a>

                        <a href="https://www.youtube.com/watch?v=7MUISDJ5ZZ4" target="_blank">
                            <i className="fab fa-youtube mr-3"></i>
                        </a>

                        <a href="https://plus.google.com/u/0/b/107863090883699620484" target="_blank">
                            <i className="fab fa-google-plus mr-3"></i>
                        </a>

                        <a href="https://dribbble.com/mdbootstrap" target="_blank">
                            <i className="fab fa-dribbble mr-3"></i>
                        </a>

                        <a href="https://pinterest.com/mdbootstrap" target="_blank">
                            <i className="fab fa-pinterest mr-3"></i>
                        </a>

                        <a href="https://github.com/mdbootstrap/bootstrap-material-design" target="_blank">
                            <i className="fab fa-github mr-3"></i>
                        </a>

                        <a href="http://codepen.io/mdbootstrap/" target="_blank">
                            <i className="fab fa-codepen mr-3"></i>
                        </a>
                    </div>

                    <div className="footer-copyright py-3">
                        © 2018 Copyright: <a href="https://mdbootstrap.com/education/bootstrap/" target="_blank"> MDBootstrap.com </a>
                    </div>
            </footer>
        </div>);
    }

}function mapStateToProps(state){
    return {...state};
};

function matchDispatchToProps(dispatch){
    return {dispatch};
};

export default connect(mapStateToProps, matchDispatchToProps)(HomeScreen);

