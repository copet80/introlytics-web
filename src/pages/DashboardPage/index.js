import React from 'react';
import './style.scss';

import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  faPaperPlane,
  faInbox,
  faUsers,
  faUserFriends,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';

import { GlobalStateConsumer } from '../../utils/globalState';
import StatisticCard from '../../components/StatisticCard';
import ContactList from '../../components/ContactList';

export default class DashboardPage extends React.Component {
  handleContactClick = (rowData) => {
    this.props.history.push(`/contact/${rowData.email}`);
  };

  render() {
    return (
      <GlobalStateConsumer>
        {({ analysis, user }) => {
          const { email } = user;
          const emailLC = email.toLowerCase();
          const data = analysis.relationships;
          const contacts = Object.keys(data || {})
            .filter((k) => {
              const entry = data[k];
              return entry.node1.key !== emailLC || entry.node2.key !== emailLC;
            })
            .map((k) => {
              const entry = data[k];
              const node =
                entry.node1.key === emailLC ? entry.node2 : entry.node1;
              return {
                ...node,
                conversationsCount: entry.interactionCount,
              };
            });

          const contactsCount = contacts.length;
          let sentCount = 0;
          let receivedCount = 0;
          let sentIntroductionCount = 0;
          let receivedIntroductionCount = 0;
          contacts.forEach((contact) => {
            sentCount += contact.receivedCount;
            receivedCount += contact.sentCount;
            sentIntroductionCount += contact.introduction.receivedCount;
            receivedIntroductionCount += contact.introduction.sentCount;
          });

          return (
            <Container className="page DashboardPage">
              <Row>
                <Col xs={12} lg={4}>
                  <StatisticCard
                    icon={faPaperPlane}
                    label="Sent Messages"
                    value={sentCount}
                  />
                </Col>
                <Col xs={12} lg={4} className="mt-4 mt-lg-0">
                  <StatisticCard
                    color="green"
                    icon={faInbox}
                    label="Received Messages"
                    value={receivedCount}
                  />
                </Col>
                <Col xs={12} lg={4} className="mt-4 mt-lg-0">
                  <StatisticCard
                    color="orange"
                    icon={faUsers}
                    label="Contacts"
                    value={contactsCount}
                  />
                </Col>
                <Col xs={12} lg={6} className="mt-4">
                  <StatisticCard
                    color="cyan"
                    icon={faUserFriends}
                    label="Introductions Sent"
                    value={sentIntroductionCount}
                  />
                </Col>
                <Col xs={12} lg={6} className="mt-4">
                  <StatisticCard
                    color="red"
                    icon={faHandshake}
                    label="Introductions Received"
                    value={receivedIntroductionCount}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <Card className="ContactListCard">
                    <Card.Body>
                      <Card.Title>Top Contacts</Card.Title>
                      <ContactList
                        data={contacts}
                        onRowClick={this.handleContactClick}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          );
        }}
      </GlobalStateConsumer>
    );
  }
}
