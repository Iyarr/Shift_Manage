import React from 'react';

import Header from './header'
import Body from './body'

// "Public" | "Setting" | "Regular" | "MyShift"
type Modes = "Login" | "ShiftList" | "ShiftSet" | "Regular"| "MyShift"| "User" | "Manage"

type ModesToVoid = (To:Modes) => void

type AppState = {
  mode: Modes
  ChangeMode: ModesToVoid
};

class App extends React.Component<{},AppState> {
  constructor(props:{}) {
    super(props);
    this.state = {
      mode: "Login",
      ChangeMode: this.ChangeMode
    };
  };

  ChangeMode(To:Modes) {
    this.setState({
      mode: To
    });
  }

  render() {
    
    return(
      <div className="app">
        <header>
        {
          this.state.mode in ["Login","Manage"]
            ? <></>
            : <Header
                ChangeMode={this.ChangeMode}
              />
        }
        </header>
        <body>
          <Body
            mode={this.state.mode}
          />
        </body>
      </div>
    );
  }
}

export default App;
