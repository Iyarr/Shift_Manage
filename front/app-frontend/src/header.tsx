import React from 'react';

type Modes = "Login" | "ShiftList" | "ShiftSet" | "Regular"| "MyShift"| "User" | "Manage"

type ModesToVoid = (To:Modes) => void

type ModeSet = {
  ChangeMode: ModesToVoid
};

class Header extends React.Component<ModeSet,ModeSet> {
  constructor(props: ModeSet) {
    super(props);
    this.state = {
      ChangeMode: props.ChangeMode
    };
  };
  render() {
    
    return(
      <div className="header">
      </div>
    );
  }
}

export default Header;