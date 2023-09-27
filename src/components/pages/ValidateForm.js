import './ValidateForm.css';
import React,{useRef,useState} from 'react';
import { Redirect } from 'react-router-dom';


var result;
var val;
export function ValidationForm()
{   
    //var result;
    const aliasnameInputRef=useRef();
    const [getResult,setGetResult]=useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        console.log("login first")
        return <Redirect to="/login" />;
      }
    //Controller: Service: Certificate Not found : certificate you are trying to validate is not found in db
     
    function submitHandler(event)
    {  
          event.preventDefault();
          const baseURL='http://localhost:2000';
          const enteredAliasname=aliasnameInputRef.current.value;
          fetch(baseURL+"/validate/"+enteredAliasname,
          {
            method:"GET",
            headers:{
                "authorization": `Bearer ${user.accessToken}`,
                "Content-Type":"application/json"},
        }).then((response) =>response.text()).then(str=>{
            result=str;
            setGetResult(str);
            //console.log(result);
           
                        
          }).catch(e=>{
            console.log(e);
            alert(e);
          })
              aliasnameInputRef.current.value=""
        }

     function refreshPage(){
      window.location.reload(true);
     }
    

    return(
        <div>
            
            <h2><center>Validate your Certificate</center></h2>
        
        <div className='item'>
        <form className='form'onSubmit={submitHandler}>
            <div className='control'>
            <label>AliasName:</label>
            <input type="text" data-testid={"alias-element"} required placeholder="enter your alias name" id="aliasname" ref={aliasnameInputRef}/>
            </div>
            <div className='actions'>
            <button data-testid={"button-element"}>Validate</button>
            </div>
            <div className='actions'>
            <button onClick={refreshPage}>Refresh</button>
            </div>
        </form>
        </div><br/>
        <div align="center" className={result==='--VALID CERTIFICATE--'?'a1':result==='Controller: Service: Certificate Not found : certificate you are trying to validate is not found in db'?'a2':'a3'}>
          <b>{getResult}</b>
        </div>

        </div>
    )
}








