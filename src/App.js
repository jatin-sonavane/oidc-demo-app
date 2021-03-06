import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App({ name }) {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);

  const apiHost = 'https://authenticated.dev.zo.zillow.net'; 
  // const apiHost = 'http://localhost:13490'; 
  const apiUrl = apiHost + '/offer-underwriting/v3/offer-requests/X1-ORz3rok71a6iyi_bs7n6/offer-underwriting'
  // const apiHost = 'https://amer-demo46-test.apigee.net';
  // const apiUrl = apiHost + '/oidc-1/httpbin/get';

  axios.interceptors.response.use(null, function (error) {
    if (error && error.response) {
      setStatus(error.response.status);
      if (error.response.status === 401) {
        // the apikey is for the apigee solution
        window.location.replace(apiHost + '/log-in?from=' + encodeURI(window.location.href));
      }  
    }
    return Promise.reject(error);
  });

  useEffect(() => {
    axios.get(apiUrl, { withCredentials: true })
    .then(function(response) {

      if (response) {
        setStatus(response.status);
        setData(response.data);  
      }
    })
  }, [name, apiUrl]);

  return (
    <div className="App">
        <p>AJAX call to {apiUrl}</p>
        <p>Status from AJAX call: {status}</p>
        <p>Data from AJAX call:</p>
        <pre id="json">
          {JSON.stringify(data, null, 2)}
        </pre>
    </div>
  );
}

export default App;
