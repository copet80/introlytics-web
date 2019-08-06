import React from 'react';
import './style.scss';

import { Container, Row, Col } from 'react-bootstrap';

import { GlobalStateConsumer } from '../../utils/globalState';
import ContactCard from '../../components/ContactCard';
import ConversationsCard from '../../components/ConversationsCard';
import IntroductionsCard from '../../components/IntroductionsCard';

export default class ContactPage extends React.Component {
  render() {
    return (
      <GlobalStateConsumer>
        {({ analysis, user }) => {
          const { email } = user;
          const emailLC = email.toLowerCase();
          const contactEmail = this.props.location.pathname.split('/').pop();
          const contactKey = `${emailLC}-${contactEmail.toLowerCase()}`;
          const relationship = (analysis.relationships || {})[contactKey];

          if (!relationship) {
            return null;
          }

          const contact =
            relationship.node1.key === emailLC
              ? relationship.node2
              : relationship.node1;

          const conversationsData = {
            rating: contact.rating,
            total: contact.sentCount + contact.receivedCount,
            theirTotal: contact.sentCount,
            theirResponseRate: contact.sentResponseRate,
            theirAvgResponseTime: contact.sentAvgTTR,
            yourTotal: contact.receivedCount,
            yourResponseRate: contact.receivedResponseRate,
            yourAvgResponseTime: contact.receivedAvgTTR,
          };

          const introductionsData = {
            rating: contact.introduction.rating,
            total:
              contact.introduction.sentCount +
              contact.introduction.receivedCount,
            theirTotal: contact.introduction.sentCount,
            theirResponseRate: contact.introduction.sentResponseRate,
            theirAvgResponseTime: contact.introduction.sentAvgTTR,
            yourTotal: contact.introduction.receivedCount,
            yourResponseRate: contact.introduction.receivedResponseRate,
            yourAvgResponseTime: contact.introduction.receivedAvgTTR,
          };

          return (
            <Container className="page ContactPage">
              <Row>
                <Col xl="auto">
                  <ContactCard email={contactEmail} rating={contact.rating} />
                </Col>
                <Col>
                  <Row>
                    <Col xl="6" className="mt-3 mt-xl-0">
                      <ConversationsCard {...conversationsData} />
                    </Col>
                    <Col xl="6" className="mt-3 mt-xl-0">
                      <IntroductionsCard {...introductionsData} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          );
        }}
      </GlobalStateConsumer>
    );
  }
}
