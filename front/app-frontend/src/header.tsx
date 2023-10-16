import React from "react";

type HeaderState = {
  setMode: (To: string) => void;
};

function Header(props: HeaderState) {
  const Buttons: { name: string; value: string }[] = [
    { name: "ShiftList", value: "シフト" },
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
