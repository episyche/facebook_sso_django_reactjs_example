import FacebookLogin from 'react-facebook-login';
import './App.css';

function App() {
  function responseFacebook(e) {
    fetch("http://127.0.0.1:8000/facebook/",
      {
        method: "POST",
        body: JSON.stringify({ "auth_token": e['accessToken'] }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("email_id").innerText = res['email']
        document.getElementById("auth-token").innerText = res['tokens']
      })
  }
  return (
    <div className="App">
      <div className="facebook">

        <FacebookLogin
          appId="FACEBOOK APP ID"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}

        />
      </div>
      <div className='show-info'>
        <div>
          <label>Email Id:</label>
          <label id='email_id'></label>
        </div>
        <div>
          <label>Auth Token:</label>
          <label id='auth-token'></label>
        </div>
      </div>
    </div>
  );
}

export default App;
