import React from "react";
import DefaultLayout from "../layouts/layout_v1";
import { Col, Row } from "antd";

const Prediction = () => {
  return (
    <>
      <DefaultLayout siteTitle="PolkaBridge Interface">
        <Row gutter={[30, 15]} type="flex">
          <Col xs={24} md={24} className="gutter-row">
            <b className="display-block text-center">Comming soon</b>
          </Col>
        </Row>
      </DefaultLayout>
    </>
  );
}

export default Prediction;