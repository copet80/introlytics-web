import React from 'react';
import classNames from 'classnames';
import './style.scss';

import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faComments,
  faComment,
  faReply,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

import StarRating from '../StarRating';
import { formatNumber } from '../../utils/number';
import { formatPercentage } from '../../utils/percentage';
import { formatDuration } from '../../utils/date';

export default class ConversationsCard extends React.Component {
  static defaultProps = {
    headingLabel: 'Conversations',
    rating: 0,
    total: 0,
    theirTotal: 0,
    theirResponseRate: 0,
    theirAvgResponseTime: 0,
    yourTotal: 0,
    yourResponseRate: 0,
    yourAvgResponseTime: 0,
  };

  render() {
    const {
      className,
      headingLabel,
      rating,
      total,
      theirTotal,
      theirResponseRate,
      theirAvgResponseTime,
      yourTotal,
      yourResponseRate,
      yourAvgResponseTime,
    } = this.props;

    return (
      <Card className={classNames('ConversationsCard', className)}>
        <Card.Body>
          <Card.Title>{headingLabel}</Card.Title>
          <dl>
            <dt>
              <FontAwesomeIcon icon={faHeart} />
              Rating
            </dt>
            <dd>
              <StarRating rating={rating} />
            </dd>
            <dt className="highlight">
              <FontAwesomeIcon icon={faComments} />
              Total
            </dt>
            <dd>{formatNumber(total)}</dd>
            <hr />
            <dt className="highlight">
              <FontAwesomeIcon icon={faComment} />
              Theirs
            </dt>
            <dd>{formatNumber(theirTotal)}</dd>
            <dt>
              <FontAwesomeIcon icon={faReply} />
              Response Rate
            </dt>
            <dd>{formatPercentage(theirResponseRate)}</dd>
            <dt>
              <FontAwesomeIcon icon={faClock} />
              Avg Response Time
            </dt>
            <dd>{formatDuration(theirAvgResponseTime)}</dd>
            <hr />
            <dt className="highlight">
              <FontAwesomeIcon icon={faComment} />
              Yours
            </dt>
            <dd>{formatNumber(yourTotal)}</dd>
            <dt>
              <FontAwesomeIcon icon={faReply} />
              Response Rate
            </dt>
            <dd>{formatPercentage(yourResponseRate)}</dd>
            <dt>
              <FontAwesomeIcon icon={faClock} />
              Avg Response Time
            </dt>
            <dd>{formatDuration(yourAvgResponseTime)}</dd>
          </dl>
        </Card.Body>
      </Card>
    );
  }
}
