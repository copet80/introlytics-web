import React, { createContext } from 'react';

const GlobalStateContext = createContext({
  data: {},
  analysis: {},
  emails: [],
  user: {},
  update: () => {},
});

export class GlobalStateProvider extends React.Component {
  update = (newState) => {
    this.setState(newState);
  };

  state = {
    data: {},
    analysis: {},
    emails: [],
    user: {
      email: 'andrew@xyzinnovation.com',
      firstName: 'Andrew',
    },
    update: this.update,
  };

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    );
  }
}

export const GlobalStateConsumer = GlobalStateContext.Consumer;
