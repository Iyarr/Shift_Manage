import React from "react";
import CalenderComponent from "./calender";

function MyShift() {
  return (
    <div className="myshift">
      <CalenderComponent selectable={false} />
    </div>
  );
}
export default MyShift;
