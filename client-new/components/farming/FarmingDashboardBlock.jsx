import React, { useState } from "react";
import moment from "moment";
import { Table, Row, Col, Card } from "antd";

const FarmingDashboardBlock = (props) => {
    return (
        <>
            <Card class="block">
                <Row className="block-title" gutter={[30, 15]} type="flex">
                    <Col xs={24} md={24} className="gutter-row">
                        <svg class="block-title-icon icon-user-circle" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                        <h6 class="block-title-text">User Info</h6>
                    </Col>
                </Row>
                <Row className="block-content" gutter={[30, 15]} type="flex">
                    <Col xs={24} md={8} className="gutter-row">
                        <div class="block-item">
                            <label class="block-item-title">Total Locked Value</label>
                            <label class="block-item-content">$0.00</label>
                        </div>
                    </Col>
                    <Col xs={24} md={8} className="gutter-row">
                        <div class="block-item">
                            <label class="block-item-title">Your Locked Value</label>
                            <label class="block-item-content">$0.00</label>
                        </div>
                    </Col>
                    <Col xs={24} md={8} className="gutter-row">
                        <div class="block-item">
                            <label class="block-item-title">Your Claimable Reward</label>
                            <label class="block-item-content">0.00 PBR</label>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default FarmingDashboardBlock;