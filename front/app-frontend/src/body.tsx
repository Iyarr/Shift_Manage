import Login from "./body/login";
import ShiftList from "./body/shiftlist";
import User from "./body/user";
import Manage from "./body/manage";

interface DirectionArray {
  [index: string]: JSX.Element;
}

type BodyProps = {
  mode: string;
};

function Body(props: BodyProps) {
  const elements: DirectionArray = {
    Login: <Login />,
    ShiftList: <ShiftList />,
    User: <User />,
    Manage: <Manage />,
  };

  return <div className="body">{elements[props.mode]}</div>;
}

export default Body;
