import "./DownloadCertificateForm.css";
import React, { useRef, useState } from "react";
import { Redirect } from "react-router-dom";

export function DownloadCertificateForm() {
  const aliasnameInputRef = useRef();
  const [getResult, setGetResult] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    console.log("login first");
    return <Redirect to='/login' />;
  }

  function submitHandler(event) {
    event.preventDefault();
    const baseURL = "http://localhost:2000";
    const enteredAliasname = aliasnameInputRef.current.value;

    fetch(baseURL + "/certificates/" + enteredAliasname, {
      method: "GET",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.blob().then((blob) => {
          console.log(blob);
          let url = window.URL.createObjectURL(blob);
          console.log(url);
          let a = document.createElement("a");
          a.href = url;
          a.download = enteredAliasname + ".cer";
          a.click();
        });
      } else {
        response.text().then((str) => {
          console.log("Controller : Certificate does not exist")
          //console.log(str);
          //alert(str);
          setGetResult("Controller : Certificate does not exist");
        });
      }
    });
  }
  function refreshPage() {
    window.location.reload(true);
  }
  return (
    <div>
      <h2>
        <center>Download your Certificate</center>
      </h2>

      <div className='item'>
        <form className='form' onSubmit={submitHandler}>
          <div className='control'>
            <label>AliasName:</label>
            <input
              type='text'
              required
              placeholder='enter your alias name'
              id='aliasname'
              ref={aliasnameInputRef}
            />
          </div>
          <div className='actions'>
            <button>Download</button>
          </div>
          <div className='actions'>
            <button onClick={refreshPage}>Refresh</button>
          </div>
        </form>
      </div>
      <br />
      <br />
      <div align='center' className='item'>
        <b>{getResult}</b>
      </div>
    </div>
  );
}