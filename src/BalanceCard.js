import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {formatCoin, formatUSD} from './CoinTypes.js';
import BalanceSendDialog from './BalanceSendDialog.js'
import BalanceReceiveDialog from './BalanceReceiveDialog.js'

const styles = theme => ({
  content: {
  },
  balances: {},
  action: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {},
});

class BalanceCard extends React.Component {

  render() {

    const {classes} = this.props;
    let balance = this.props.balance;

    return (

      <Card raised={true} style={{'background': 'transparent'}}>
        <CardHeader
          title={
            formatCoin(balance.ChanTotal + balance.TxoTotal,
              balance.CoinType) + " (" + formatUSD(balance.ChanTotal + balance.TxoTotal, balance.CoinType, this.props.coinRates) + ")"
          } style = {{textAlign: 'right', opacity: '0.9', fontSize: '12px', 'font-family': 'Architects Daughter, cursive'}}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.balance} style = {{'text-align': 'center', 'color': 'white'}}>
            Txo: {formatCoin(balance.TxoTotal, balance.CoinType)}
          </Typography>
        </CardContent>
        <CardActions className={classes.action} disableActionSpacing>
          <BalanceReceiveDialog
            coinType={balance.CoinType}
            newAddress={this.props.newAddress}
          />
          <BalanceSendDialog
            handleSendSubmit={this.props.handleSendSubmit}
            coinType={balance.CoinType}
          />
        </CardActions>
      </Card>
    );
  }
}

BalanceCard.propTypes = {
  balance: PropTypes.object.isRequired,
  handleSendSubmit: PropTypes.func.isRequired,
  coinRates: PropTypes.object.isRequired,
  newAddress: PropTypes.func.isRequired,
};


export default withStyles(styles)(BalanceCard);
