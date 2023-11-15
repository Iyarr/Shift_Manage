import React, { useState, useRef, useEffect, CSSProperties } from "react";

function CalendersComponent() {
  const GetThisSundayDate = (today: Date) => {
    // 日曜日から現在の曜日までの日数を計算して日曜日の日付を求める
    const sundayDate = new Date(today);
    sundayDate.setDate(today.getDate() - today.getDay());

    return sundayDate;
  };
  const [StartDate, Set] = useState(GetThisSundayDate(new Date()));

  const Arrangements = fetch(``);
  const DisplayDate = [];

  const style: CSSProperties = {};
  const ButtonsStyle: CSSProperties = {};
  const CalanderStyle: CSSProperties = {};

  return (
    <div style={style}>
      <div style={ButtonsStyle}></div>
      <div style={CalanderStyle}></div>
    </div>
  );
}
