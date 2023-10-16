import React from "react";

function Login() {
  const login: React.CSSProperties = {
    backgroundColor: "aquamarine",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontSize: "2vw",
  };

  const h1: React.CSSProperties = {
    fontSize: "3em",
  };

  const button: React.CSSProperties = {
    margin: "10% 0%",
    width: "80%",
  };

  return (
    <div style={login}>
      <h1 style={h1}>ログイン</h1>
      <form action="" method="post" className="loginform">
        <div className="">
          <h2>ユーザー名</h2>
          <input type="text" name="userName" placeholder="Username" />
        </div>

        <div>
          <h2>パスワード</h2>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <button type="submit" style={button}>
          ログイン
        </button>
      </form>
    </div>
  );
}

export default Login;
