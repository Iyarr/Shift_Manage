import React from 'react';
import './css/login.css';


class Login extends React.Component {
    render() {
    return(
        <div className="login">
          <h1>ログイン</h1>
          <form action="" method="post" className="loginform">
            <div className="">
              <h2>ユーザー名</h2>
              <input type="text" name="user" placeholder="Username"/>
            </div>

            <div>
              <h2>パスワード</h2>
              <input type="password" name="pass" placeholder="Password"/>
            </div>
            <input type="button" value="ログイン" className="button"/>
          </form>
          <p>パスワード忘れた...</p>
        </div>
    );}
}

export default Login;