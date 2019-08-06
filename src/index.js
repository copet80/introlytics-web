import React from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';
import moment from 'moment';
import './style.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalStateProvider, GlobalStateConsumer } from './utils/globalState';
import { analyse } from './utils/analysis';

import CommonHeader from './components/CommonHeader';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';

class App extends React.Component {
  componentDidMount() {
    Papa.parse(
      'https://uploads.codesandbox.io/uploads/user/9d090d16-f524-4995-ac73-79f6866e0560/3xnJ-sample_data.csv',
      {
        download: true,
        header: true,
        transformHeader: (header) => {
          const result = header
            .toLowerCase()
            .replace(/_([a-z])/, function(m) {
              return m.toUpperCase();
            })
            .replace(/_/, '');
          return result;
        },
        transform: (value, header) => {
          switch (header) {
            case 'sentAt':
            case 'insertedAt':
            case 'updatedAt':
              return moment(value);

            default:
              return value;
          }
        },
        complete: this.handleLoadDataComplete,
      },
    );
  }

  handleLoadDataComplete = (results) => {
    const data = results.data.splice(0, results.data.length - 1);

    const emailsMap = {};
    data.forEach((entry) => {
      emailsMap[entry.from] = true;
      emailsMap[entry.to] = true;
    });
    const emails = Object.keys(emailsMap).sort();
    const analysis = analyse(data, this.user.email);
    this.updateState({ data, emails, analysis });
  };

  render() {
    return (
      <GlobalStateProvider>
        <GlobalStateConsumer>
          {({ update, user }) => {
            this.updateState = update;
            this.user = user;

            return (
              <Router>
                <div className="App introlytics">
                  <CommonHeader />
                  <section className="body">
                    <Route path="/" exact component={DashboardPage} />
                    <Route path="/contact" component={ContactPage} />
                  </section>
                  <footer />
                </div>
              </Router>
            );
          }}
        </GlobalStateConsumer>
      </GlobalStateProvider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
