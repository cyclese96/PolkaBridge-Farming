import React from 'react';
import { Button } from 'antd';

const ConnectWalletButton = (props) => {
    return (
        <>
            {!props.wallet && <Button className="float-right btn outline-btn" onClick={props.onClick} style={{margin: '8px 15px'}}>Connect Wallet</Button>}
            {props.wallet && <a className="float-right btn outline-btn" style={{margin: '8px 15px'}} href={props.wallet.etherscanLink} title={props.wallet.address} target="_blank">{props.wallet.shortAddress}</a>}
        </>
    );
}

export default ConnectWalletButton;
