import React from 'react';
import './css/user.css';


class User extends React.Component {
    render() {
        return(
            <div className="userset">
              <h1>ユーザー設定</h1>
              <div className="buttonList">
                <input type="button" value="ユーザー情報変更" className="userinfo"/>
                <input type="button" value="パスワード変更" className="password"/>
                <input type="button" value="ログアウト" className="logout"/>
              </div>
            </div>
        );}
}

export default User;