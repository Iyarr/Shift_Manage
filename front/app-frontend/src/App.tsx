import { useState } from "react";

import Header from "./header";
import Body from "./body";

function App() {
  const [mode, setMode] = useState<string>("ShiftList");

  return (
    <div className="app">
      {(() => {
        if (mode !== "Login" && mode !== "Manage") {
          return <Header setMode={setMode} />;
        }
      })()}
      <Body mode={mode} />
    </div>
  );
}

export default App;
