import React, {Component} from 'react';
import Payment from 'payment';

class CreditCard extends Component {
  static config;

  renderCardNumberInput() {
    let {cardNumber} = this.props;

    return <div className="small-12 columns">
      <input type="text"
        ref={ref => ref && Payment.formatCardNumber(ref)}
        onInput={e => this.props.onChangeNumber(e.target.value)}
        placeholder="Card Number" />
    </div>;
  }

  renderCardHolderInput() {
    let {cardHolder} = this.props;

    return <div className="small-12 columns">
      <input type="text"
        onInput={e => this.props.onChangeName(e.target.value)}
        placeholder="Name" />
    </div>;
  }

  renderCardExpirationInput() {
    let {cardExpiration} = this.props;

    return <div className="small-6 columns">
      <input type="text"
        ref={ref => ref && Payment.formatCardExpiry(ref)}
        onInput={e => this.props.onChangeExpiration(e.target.value)}
        placeholder="Valid Thru" />
    </div>;
  }

  renderCardSecurityInput() {
    let {cardSecurity} = this.props;

    return <div className="small-6 columns">
      <input type="text"
        ref={ref => ref && Payment.formatCardCVC(ref)}
        onInput={e => this.props.onChangeCVC(e.target.value)}
        placeholder="CVC" />
    </div>;
  }

  render() {
    return <div className={'comp-cc ' + (this.props.className || '')}>
      {this.renderCardNumberInput()}
      {this.props.cardholderName && this.renderCardHolderInput()}
      {this.renderCardExpirationInput()}
      {this.renderCardSecurityInput()}
      {this.props.children}
    </div>
  }
}

CreditCard.config = {
  cardholderName: true
};

export default CreditCard;