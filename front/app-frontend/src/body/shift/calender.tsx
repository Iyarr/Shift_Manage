import { useState,useRef,useEffect } from 'react';
import { Calendar,ToolbarInput,CustomButtonInput } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

declare module '@fullcalendar/core' {
  interface CalendarOptions {
    // カレンダーオプションの型定義を追加
    // 例: plugins?: PluginDef[] | PluginDef;
  }
}
function CalenderComponent() {
    const views = ["dayGridWeek","dayGridMonth"]
    const [count, setCount] = useState<number>(0)
    const calendarRef = useRef<FullCalendar>(null);

    const calendarOptions = {
        ref:calendarRef,
        plugins:[ dayGridPlugin, interactionPlugin ],
        initialView:views[count],
        locale:"ja",
        hiddenDays:[0],
        dayCellContent:() => {},
        headerToolbar:{
            start:"title",
            center: 'today prev,next',
            end: 'myCustomButton'
        },
        customButtons:{
            myCustomButton:{
                text: '表示切替',
                click: () => {
                    if (calendarRef.current) {
                        calendarRef.current.getApi().changeView(views[count]);
                        setCount((count+1)%2)
                    }
                }
            }
        }
    }
    return(
      <div className="calender">
        <FullCalendar {...calendarOptions}/>
      </div>
    );
}
export default CalenderComponent;


