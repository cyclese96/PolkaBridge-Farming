import React from "react";
import DefaultLayout from "../layouts/layout_v1";
import { Col, Row } from "antd";

const Farming = () => {
  
  return (
    <>
      <DefaultLayout siteTitle="PolkaBridge Interface">
        <Row gutter={[30, 15]} type="flex">
          <Col xs={24} md={4} className="gutter-row">
          </Col>
          <Col xs={24} md={20} className="gutter-row">
          </Col>
        </Row>

      </DefaultLayout>
    </>
  );
}

export default Farming;