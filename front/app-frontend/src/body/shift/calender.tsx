import { useState, useRef, useEffect } from "react";
import { Calendar, ToolbarInput, CustomButtonInput } from "@fullcalendar/core";
import { SlotLabelContentArg } from "@fullcalendar/common";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import internal from "stream";

function CalenderComponent() {
  //const views = ["dayGridWeek", "dayGridMonth"];
  //const [count, setCount] = useState<number>(0);
  const calendarRef = useRef<FullCalendar>(null);
  const partition = ["X", "Y", "Z", "A", "B", "C", "D"];

  const calendarOptions = {
    ref: calendarRef,
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: "timeGridWeek",
    allDaySlot: false,
    slotMinTime: "0:00",
    slotMaxTime: "7:00",
    slotDuration: "1:00",
    slotLabelContent: (arg: SlotLabelContentArg) => {
      const num = Number(arg.text[0]);
      return partition[num];
    },

    selectable: true,
    locale: "ja",
    hiddenDays: [0],
    headerToolbar: {
      start: "title",
      center: "today prev,next",
      end: "",
      //end: "myCustomButton"
    },
    /* 一旦機能は廃止
    customButtons: {
      myCustomButton: {
        text: "表示切替",
        click: () => {
          if (calendarRef.current) {
            calendarRef.current.getApi().changeView(views[count]);
            setCount((count + 1) % 2);
          }
        },
      },
    },
    */
  };
  return (
    <div className="calender">
      <FullCalendar {...calendarOptions} />
    </div>
  );
}
export default CalenderComponent;

function DayCellContent() {
  return;
}
