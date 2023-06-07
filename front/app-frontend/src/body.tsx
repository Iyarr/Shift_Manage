
import Login from './body/login'
import ShiftList from './body/shift/shiftlist'
import ShiftSet from './body/shift/shiftset'
import Regular from './body/shift/regular'
import MyShift from './body/shift/myshift'
import User from './body/user'
import Manage from './body/manage'

interface DirectionArray {
  [index: string]: JSX.Element
}

type BodyProps = {
  mode: string
};

function Body(props:BodyProps) {
  const elements:DirectionArray = {
    Login:<Login/>,
    ShiftList:<ShiftList/>,
    ShiftSet:<ShiftSet/>,
    Regular:<Regular/>,
    MyShift:<MyShift/>,
    User:<User/>,
    Manage:<Manage/>
  }

  return (<div className="body">{elements[props.mode]}</div>);
}

export default Body;