import { useState, useRef, useEffect } from "react";
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
  const partition = ["X", "Y", "Z", "A", "B", "C", "D"];

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
      return partition[num];
    },
    /*
    slotLaneContent: (arg: SlotLaneContentArg): JSX.Element => {
      return (
        <div>
          <div>some html</div>
          <div>some html</div>
          <div>some html</div>
          <div>some html</div>
          <div>some html</div>
          <div>some html</div>
        </div>
      );
    },
    */
    dayCellContent: (arg: DayCellContentArg): JSX.Element => {
      return (
        <div>
          <div>some html</div>
          <div>some html</div>
          <div>some html</div>
          <div>some html</div>
          <div>some html</div>
          <div>some html</div>
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
      <FullCalendar {...Object.assign(calendarOptions, { ...props })} />
    </div>
  );
}
export default CalenderComponent;

function TimeCellContent() {
  return;
}
