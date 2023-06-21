import React, { useState, useRef, useEffect } from "react";
import CalenderComponent from "./calender";

type component = {
  date: string;
  mamber: {
    X: string[];
    Y: string[];
    Z: string[];
    A: string[];
    B: string[];
    C: string[];
    D: string[];
  };
};

type Props = {
  user: string;
  onclick: React.MouseEventHandler<HTMLButtonElement>;
};

function Arrange(props: Props) {
  return (
    <div className="arrange">
      <CalenderComponent selectable={true} />
      <button>削除</button>
      <button>登録</button>
      <button onClick={props.onclick}>設定</button>
    </div>
  );
}
export default Arrange;
