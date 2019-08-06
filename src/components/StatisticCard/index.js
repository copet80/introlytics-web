import React from 'react';
import classNames from 'classnames';
import './style.scss';

import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatNumber } from '../../utils/number';

export default class StatisticCard extends React.Component {
  static defaultProps = {
    icon: null,
    label: '',
    value: 0,
    color: 'blue',
  };

  render() {
    const { icon, label, value, color } = this.props;

    return (
      <Card className={classNames('StatisticCard', color)}>
        <Card.Body>
          <div className="icon">
            <FontAwesomeIcon icon={icon} />
          </div>
          <div className="info">
            <span className="label">{label}</span>
            <span className="value">{formatNumber(value)}</span>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
