import { useState, useRef, useEffect } from "react";
import { Calendar, DatesSetArg, CustomButtonInput } from "@fullcalendar/core";
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

function CalenderComponent(props: { selectable: boolean }) {
  const calendarRef = useRef<FullCalendar>(null!);
  const parts = ["X", "Y", "Z", "A", "B", "C", "D"];
  let Monday = "";

  const GetCalenderData = (monday: string) => {
    if (Monday !== monday) {
      Monday = monday;
      console.log(monday);
      // return fetch(``)
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      GetCalenderData(calendarApi.view.activeStart.toLocaleDateString());

      // Listen for date changes
      const handleDatesSet = (dateInfo: DatesSetArg) => {
        GetCalenderData(dateInfo.start.toLocaleDateString());
      };

      //calendarApi オブジェクトの "datesSet" イベントが発生したときに handleDatesSet 関数を呼び出すように設定
      calendarApi.on("datesSet", handleDatesSet);

      // コンポーネントがアンマウントされるとき、または再レンダリングされる前に実行される
      return () => {
        calendarApi.off("datesSet", handleDatesSet);
      };
    }
  }, []);

  const calendarOptions = {
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
    <FullCalendar
      locale="ja"
      ref={calendarRef}
      plugins={[
        dayGridPlugin, // initialView
        interactionPlugin, // インタラクションや操作に関連する設定(未使用)
        timeGridPlugin, // allDaySlot,slotDuratio
      ]}
      initialView="timeGridWeek"
      allDaySlot={false}
      slotMinTime={{ hours: 0 }}
      slotMaxTime={{ hours: 7 }}
      slotDuration={{ hours: 1 }}
      hiddenDays={[0]}
      height="auto"
      slotLabelContent={(arg: SlotLabelContentArg) => {
        return parts[Number(arg.text[0])];
      }}
      {...calendarOptions}
      {...props}
    />
  );
}
export default CalenderComponent;
