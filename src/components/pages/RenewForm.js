import classes from './RenewForm.module.css'
import {useRef,useState} from 'react'
import React from 'react';
import { Redirect } from 'react-router-dom';

var result;
 export function RenewForm()
{   
    const aliasInputRef=useRef();
    const renewYearInputRef=useRef();
    const [getResult,setGetResult]=useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        console.log("login first")
        return <Redirect to="/login" />;
      }
    
    function submitHandler(event)
    {
        event.preventDefault();
        const baseURL='http://localhost:2000/renew';
        const enteredAlias=aliasInputRef.current.value;
        const enteredRenewYear=renewYearInputRef.current.value;

        const certiData={
            alias:enteredAlias,
            renewYears:enteredRenewYear
        };
       
        fetch(baseURL,
            {
                
                method:"PUT",
                headers:{
                    "authorization": `Bearer ${user.accessToken}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(certiData)
            }).then((response) =>response.text()).then(str=>{
                result=str;
                //console.log(str);
                setGetResult(str);
              }).catch((error) =>
            {
                alert("Error!")
            })
            aliasInputRef.current.value=""
            renewYearInputRef.current.value=""
      }
      
      function refreshPage(){
        window.location.reload(true);
       }
      
        return(
            <div>
                <h2><center>Renew your Certificate</center></h2>
            
            <div className={classes.item}>            
                <form className={classes.form} onSubmit={submitHandler}>
                    
                    <div className={classes.control}>
                        <label htmlFor="title">Alias Name</label>
                        <input type="text" required id="alias"  data-testid={"alias-element"} placeholder='enter your alias name' ref={aliasInputRef}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="image">Renew Years</label>
                        <input type="number" required id="renewYear" placeholder='enter renew years' data-testid={"year-element"} min="1" max="10" ref={renewYearInputRef}/>
                    </div>
                    <div className={classes.actions}>
                    <button data-testid={"button-element"}>Renew Certificate</button> 
                </div>
                <div className='actions'>
                  <button onClick={refreshPage}>Refresh</button>
                </div>
                </form>
            </div><br/>
        <div align="center" className={result==='Certificate renewed successfully'?'a1':result==='Controller: Service: Certificate Not Found: The certificate you are tyring to renew is not found in db'?'a2':'a3'}>
          <b>{getResult}</b>
        </div>
            </div>
            
            
        )
      
        
        }
