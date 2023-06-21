import React, { useState, useRef, useEffect } from "react";
import Arrange from "./arrange";
import UserSet from "./userset";

interface DirectionArray {
  [index: string]: JSX.Element;
}

type ManageProps = {
  mode: string;
};

function Manage() {
  const [mode, setMode] = useState<number>(0);
  const [user, setUser] = useState<string>("");
  const modes = ["Arrange", "User"];
  const setClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setMode((mode + 1) % 2);
  };

  const elements: DirectionArray = {
    Shift: <Arrange onclick={setClick} user={user} />,
    User: <UserSet user={user} />,
  };

  return (
    <div className="manage">
      {elements[modes[mode]]}
      <div className="nameList"></div>
    </div>
  );
}
export default Manage;
