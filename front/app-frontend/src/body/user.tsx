import React, { useState, CSSProperties } from "react";

function User() {
  const UserSet: CSSProperties = {
    backgroundColor: "aquamarine",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontSize: "2vw",
    width: "70%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const H1: CSSProperties = {
    fontSize: "5vmin",
  };

  const Button: CSSProperties = {
    backgroundColor: "chartreuse",
    fontSize: "3vmin",
    width: "40%",
    padding: "4%",
    margin: "4%",
  };

  const ItemList: CSSProperties = {
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
    margin: "0.5vmin",
    padding: "0.5vmin",
  };

  const Item: CSSProperties = {
    margin: "1vmin",
    width: "28vmin",
    height: "4.5vh",
    fontSize: "2.5vh",
    borderBottom: "1px solid black",
  };

  const Text: CSSProperties = {
    margin: "0.5vmin",
    width: "25vmin",
    height: "4vh",
    fontSize: "2vh",
  };

  const InputItem: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    minWidth: "0",
    width: "90%",
  };

  //const user = fetch(``);

  const user = {
    userName: "Ohtani",
    password: "ohtanipass",
    displayName: "大谷",
    isManager: false,
  };

  const [userName, SetuserName] = useState(user.userName);
  const [password, Setpassword] = useState(user.password);
  const [displayName, SetdisplayName] = useState(user.displayName);

  return (
    <div style={UserSet}>
      <h1 style={H1}>ユーザー情報</h1>
      <form action="" method="post">
        <div style={InputItem}>
          <div style={ItemList}>
            <div style={Item}>ユーザーネーム</div>
            <div style={Item}>パスワード</div>
            <div style={Item}>表示名</div>
          </div>
          <div style={ItemList}>
            <input
              type="text"
              style={Text}
              value={userName}
              onChange={(event) => SetuserName(event.target.value)}
            />
            <input
              type="text"
              style={Text}
              value={password}
              onChange={(event) => Setpassword(event.target.value)}
            />
            <input
              type="text"
              style={Text}
              value={displayName}
              onChange={(event) => SetdisplayName(event.target.value)}
            />
          </div>
        </div>
        <input type="submit" style={Button} value="変更" />
      </form>
    </div>
  );
}

export default User;
