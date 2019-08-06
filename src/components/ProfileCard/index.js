import React from 'react';
import './style.scss';

import Image from '../Image';

export default class ProfileCard extends React.Component {
  static defaultProps = {
    firstName: 'John',
    email: 'john@xyzcompany.com',
    imageSrc: 'https://www.cover1.net/wp-content/uploads/2017/04/john-doe.jpg',
  };

  render() {
    const { firstName, email, imageSrc } = this.props;

    return (
      <div className="ProfileCard">
        <Image src={imageSrc} roundedCircle />
        <div className="info">
          <p className="greeting">Hi, {firstName}!</p>
          <p className="email">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
      </div>
    );
  }
}
