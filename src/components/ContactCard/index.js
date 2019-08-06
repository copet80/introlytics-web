import React from 'react';
import './style.scss';

import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Image from '../Image';
import StarRating from '../StarRating';

export default class ContactCard extends React.Component {
  static defaultProps = {
    imageSrc:
      'https://i.pinimg.com/originals/bf/72/d2/bf72d27f95b86eaefd51502d82ed6a77.jpg',
    email: 'jane@abccompany.com',
    rating: 0,
  };

  render() {
    const { imageSrc, email, rating } = this.props;

    return (
      <Card className="ContactCard">
        <Card.Body>
          <Image src={imageSrc} roundedCircle />
          <Card.Title>Contact</Card.Title>
          <Card.Text className="email">{email}</Card.Text>
          <Card.Text className="starRating">
            <StarRating rating={rating} />
          </Card.Text>
          <Card.Text className="actions">
            <a className="button" href={`mailto:${email}`}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="text">Send an email</span>
            </a>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
