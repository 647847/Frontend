import React, { Component} from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data : null
    };
  }
  componentWillMount() {
    this.renderMyData();
}

renderMyData(){
  const user = JSON.parse(localStorage.getItem("user"));
  const { user: currentUser } = this.props;
  const baseURL='http://localhost:2000/certs/'
  fetch(baseURL+currentUser.username,
    {
      method:"GET",
      headers:{
          "authorization": `Bearer ${user.accessToken}`,
          "Content-Type":"application/json"},
  }).then((response) =>response.text()).then(str=>{
    if(str==="no certificates yet"){
      this.setState({ data : str })
    }
    else{
      const certlist = str.split("\n")     
    const renderList =  certlist.map((item) =>
      
        
        <div>
          
          Álias : {item.split(",")[0]}<br></br>
          Issued Date : {item.split(",")[1]}<br></br>
          Expiry Date : {item.split(",")[2]}<br></br><br></br>
        </div>                           
 );
                     
      this.setState({ data : renderList })

    }
    
                  
    })

}
 
  render() {
    
    const user = JSON.parse(localStorage.getItem("user"));
    const { user: currentUser } = this.props;
    

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    
    return (
 
      <div class="card bg-light text-dark">     

         
        
        <h1>{currentUser.username}</h1>
        
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p><br></br><br></br>
        <p><strong>Certificate List</strong></p>
        {this.state.data}
          </div>
        
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);