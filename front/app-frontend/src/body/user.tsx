import React from 'react';
import './css/user.css';


class User extends React.Component {
    render() {
    return(
      <div className="UserSet">
        <h1>ユーザー設定</h1>
        <div className="buttonList">
          <input type="button" value="ユーザー情報変更" />
          <input type="button" value="パスワード変更" />
          <input type="button" value="ログアウト" />
        </div>
      </div>
    );}
}

export default User;