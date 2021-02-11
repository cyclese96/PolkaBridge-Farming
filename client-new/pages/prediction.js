import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "../layouts/layout_v1";
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Avatar } from "antd";

const Prediction = () => {
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  
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