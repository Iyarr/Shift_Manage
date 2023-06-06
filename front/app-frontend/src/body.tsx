import React from 'react';

import Login from './body/login'
import ShiftList from './body/shift/shiftlist'
import ShiftSet from './body/shift/shiftset'
import Regular from './body/shift/regular'
import MyShift from './body/shift/myshift'
import User from './body/user'
import Manage from './body/manage'

type Modes = "Login" | "ShiftList" | "ShiftSet" | "Regular"| "MyShift"| "User" | "Manage"

interface DirectionArray {
  [index: string]: JSX.Element
}

type BodyProps = {
  mode: Modes
};

type State = {
    mode: Modes
    elements: DirectionArray
};

class Body extends React.Component<BodyProps,State> {
  constructor(props: BodyProps) {
    super(props);
    this.state = {
      mode: props.mode,
      elements: {
        Login:<Login/>,
        ShiftList:<ShiftList/>,
        ShiftSet:<ShiftSet/>,
        Regular:<Regular/>,
        MyShift:<MyShift/>,
        User:<User/>,
        Manage:<Manage/>
      }
    };
  };

  render() {
    return(
      <div className="BodyClass">
        {this.state.elements[this.state.mode]}
      </div>
    );
  }
}

export default Body;