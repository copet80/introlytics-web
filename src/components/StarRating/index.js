import React from 'react';
import './style.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

export default class StarRating extends React.Component {
  static defaultProps = {
    rating: 0,
  };

  render() {
    const { rating } = this.props;
    const ratings = [];

    let i = -1;
    while (++i < rating) {
      if (i + 1 > rating) {
        break;
      }
      ratings.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
    if (rating - i >= 0.5) {
      ratings.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} />);
      i += 0.5;
    }
    while (++i <= 5) {
      ratings.push(<FontAwesomeIcon key={i} icon={faStarOutline} />);
    }

    return <span className="StarRating">{ratings}</span>;
  }
}
