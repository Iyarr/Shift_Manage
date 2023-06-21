import React from "react";
import CalenderComponent from "./calender";

function ShiftList() {
  return (
    <div className="shiftlist">
      <CalenderComponent selectable={false} />
    </div>
  );
}
export default ShiftList;
