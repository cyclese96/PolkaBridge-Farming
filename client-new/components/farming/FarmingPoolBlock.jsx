import React, { useState } from "react";
import moment from "moment";
import { Table, Row, Col, Card, Button } from "antd";
import Utils from "../common/Utils";

const FarmingPoolBlock = (props) => {
    return (
        <>
            <Card class="block">
                <Row className="block-title no-margin" gutter={[30, 15]} type="flex">
                    <Col xs={24} md={24} className="gutter-row text-center no-padding">
                        <div class="pool-token-img">
                            <img class="pool-token1-img" src={"/img/tokens/" + props.token1.toLowerCase() + ".png"} width="60" height="60"></img>
                            <img class="pool-token2-img" src={"/img/tokens/" + props.token2.toLowerCase() + ".png"} width="60" height="60"></img>
                        </div>
                        <label class="pool-title">{props.token1.toUpperCase()} - {props.token2.toUpperCase()}</label>
                        <label class="pool-description">{props.description}</label>
                    </Col>
                </Row>
                <Row className="block-content no-margin" gutter={[30, 15]} type="flex">
                    <Col xs={24} md={24} className="gutter-row no-padding">
                        <div class="block-item">
                            {!props.connected && <Button className="btn display-block margin-bottom-16">Connect wallet</Button>}
                            {props.connected && (!props.approved ? <Button className="btn display-block margin-bottom-16">Approve contract</Button>
                            :
                            <>
                                <div class="pool-text-group">
                                    <label class="pool-text-label">Earned</label>
                                    <label class="pool-text-value">{Utils.FormatMoney(props.earned)} PBR</label>
                                </div>
                                <Button className="btn display-block margin-top-6 margin-bottom-6">Claim</Button>
                                <div class="pool-text-group">
                                    <label class="pool-text-label">Locked</label>
                                    <label class="pool-text-value">{Utils.FormatMoney(props.locked)} {props.token1.toUpperCase()}-{props.token2.toUpperCase()} LP</label>
                                </div>
                                <div class="pool-text-group">
                                    <Button className="btn margin-top-6 margin-bottom-6">Deposit</Button>
                                    <Button className="btn margin-top-6 margin-bottom-6">Withdraw</Button>
                                </div>
                            </>
                            )}
                            <div class="pool-text-group">
                                <label class="pool-text-label">Total Locked Value</label>
                                <label class="pool-text-value">${Utils.FormatMoney(props.totallocked)}</label>
                            </div>
                            <div class="pool-text-group">
                                <label class="pool-text-label">APY</label>
                                <label class="pool-text-value highlight">{Utils.FormatMoney(props.apy)}%</label>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default FarmingPoolBlock;