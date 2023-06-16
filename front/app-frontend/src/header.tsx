import React from "react";

type StringToVoid = (To: string) => void;

type HeaderState = {
  setMode: StringToVoid;
};

interface button {
  name: string;
  value: string;
}

function Header(props: HeaderState) {
  const Buttons: button[] = [
    { name: "ShiftList", value: "公開シフト" },
    { name: "ShiftSet", value: "シフト設定" },
    { name: "Regular", value: "固定シフト" },
    { name: "User", value: "ユーザー" },
  ];

  const ButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    props.setMode(event.currentTarget.className);
  };

  return (
    <div className="header">
      {Buttons.map((Button) => (
        <button
          className={Button["name"]}
          onClick={ButtonClick}
          key={Button["name"]}
        >
          {Button["value"]}
        </button>
      ))}
    </div>
  );
}

export default Header;
