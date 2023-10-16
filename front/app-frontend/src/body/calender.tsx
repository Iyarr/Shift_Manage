import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Calendar, ToolbarInput, CustomButtonInput } from "@fullcalendar/core";
import {
  SlotLabelContentArg,
  SlotLaneContentArg,
  SlotLaneMountArg,
  DayCellContentArg,
} from "@fullcalendar/common";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

type Options = {
  selectable: boolean;
  //onclick: () => void;
};

function CalenderComponent(props: Options) {
  //const views = ["dayGridWeek", "dayGridMonth"]
  //const [count, setCount] = useState<number>(0)
  const calendarRef = useRef<FullCalendar>(null);
  const parts = ["X", "Y", "Z", "A", "B", "C", "D"];

  const StyledFullCalendar = styled(FullCalendar)`
    .body {
      background-color: #f2f2f2;
    }
  `;

  const calenderData = fetch(``);

  const calendarOptions = {
    ref: calendarRef,
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: "timeGridWeek",
    allDaySlot: false,
    slotMinTime: { hours: 0 },
    slotMaxTime: { hours: 7 },
    slotDuration: { hours: 1 },
    slotLabelContent: (arg: SlotLabelContentArg) => {
      const num = Number(arg.text[0]);
      return parts[num];
    },
    dayCellContent: (arg: DayCellContentArg): JSX.Element => {
      return (
        <div>
          {parts.map((part, index) => (
            <div key={index}>
              {arg.date.toLocaleDateString().replaceAll("/", "-") + "-" + part}
            </div>
          ))}
        </div>
      );
    },
    locale: "ja",
    hiddenDays: [0],
    height: "auto",
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
            calendarRef.current.getApi().changeView(views[count])
            setCount((count + 1) % 2)
          }
        },
      },
    },
    */
  };
  return (
    <div className="calender">
      <StyledFullCalendar {...Object.assign(calendarOptions, { ...props })} />
    </div>
  );
}
export default CalenderComponent;
