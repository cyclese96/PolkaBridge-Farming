import React, { useState } from "react";
import moment from "moment";
import { Table, Row, Col, Card, Button } from "antd";

const FarmingPoolBlock = (props) => {
    return (
        <>
            <Card class="block">
                <Row className="block-title no-margin" gutter={[30, 15]} type="flex">
                    <Col xs={24} md={24} className="gutter-row text-center no-padding">
                        <div class="pool-token-img">
                            <img class="pool-token1-img" src="/img/tokens/pbr.png" width="60" height="60"></img>
                            <img class="pool-token2-img" src="/img/tokens/eth.png" width="60" height="60"></img>
                        </div>
                        <label class="pool-title">PBR - ETH</label>
                        <label class="pool-description">Deposit PBR-WETH UNI-V2 Earn PBR</label>
                    </Col>
                </Row>
                <Row className="block-content no-margin" gutter={[30, 15]} type="flex">
                    <Col xs={24} md={24} className="gutter-row no-padding">
                        <div class="block-item">
                            <Button className="btn display-block margin-bottom-16">Select</Button>
                            <div class="pool-text-group">
                                <label class="pool-text-label">Total Locked Value</label>
                                <label class="pool-text-value">$270,801</label>
                            </div>
                            <div class="pool-text-group">
                                <label class="pool-text-label">APY</label>
                                <label class="pool-text-value highlight">168.68%</label>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default FarmingPoolBlock;