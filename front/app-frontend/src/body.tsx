import Login from "./body/login";
import ShiftList from "./body/shiftlist";
import ShiftSet from "./body/shiftset";
import Regular from "./body/regular";
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
    ShiftSet: <ShiftSet />,
    Regular: <Regular />,
    User: <User />,
    Manage: <Manage />,
  };

  return <div className="body">{elements[props.mode]}</div>;
}

export default Body;
