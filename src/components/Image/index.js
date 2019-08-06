import React from 'react';
import classNames from 'classnames';
import './style.scss';

export default class Image extends React.Component {
  render() {
    const { src, roundedCircle } = this.props;

    const style = {};
    if (src) {
      style.backgroundImage = `url(${src})`;
    }

    return (
      <div
        className={classNames('Image', roundedCircle && 'roundedCircle')}
        style={style}
      />
    );
  }
}
