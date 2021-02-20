import React from "react";
import DefaultLayout from "../layouts/layout_v1";
import { Col, Row } from "antd";
import FarmingDashboardBlock from "../components/farming/FarmingDashboardBlock";
import FarmingPoolBlock from "../components/farming/FarmingPoolBlock";

const Farming = () => {
  return (
    <>
      <DefaultLayout siteTitle="PolkaBridge Interface">
        <Row gutter={[30, 15]} type="flex">
          <Col xs={24} md={24} className="gutter-row">
            <FarmingDashboardBlock></FarmingDashboardBlock>
          </Col>
        </Row>
        <Row gutter={[30, 15]} type="flex">
          <Col xs={24} md={8} className="gutter-row">
            <FarmingPoolBlock connected={true} token1="pbr" token2="eth" description="Deposit PBR-WETH UNI-V2 Earn PBR" totallocked="270801" apy="168.68" earned="0" locked="0"></FarmingPoolBlock>
          </Col>
          <Col xs={24} md={8} className="gutter-row">
            <FarmingPoolBlock connected={false} token1="pbr" token2="usdt" description="Deposit PBR-USDT UNI-V2 Earn PBR" totallocked="270801" apy="168.68" earned="0" locked="0"></FarmingPoolBlock>
          </Col>
          <Col xs={24} md={8} className="gutter-row">
            <FarmingPoolBlock connected={true} token1="pbr" token2="usdc" description="Deposit PBR-USDC UNI-V2 Earn PBR" totallocked="270801" apy="168.68" earned="0" locked="0"></FarmingPoolBlock>
          </Col>
        </Row>
      </DefaultLayout>
    </>
  );
}

export default Farming;