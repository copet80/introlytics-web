import BaseComponent from '../ConversationsCard';
import './style.scss';

export default class IntroductionsCard extends BaseComponent {
  static defaultProps = {
    ...BaseComponent.defaultProps,
    className: 'IntroductionsCard',
    headingLabel: 'Introductions',
  };
}
