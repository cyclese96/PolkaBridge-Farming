import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "../layouts/layout_v1";
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Avatar } from "antd";
import moment from "moment";
import Utils from "../components/common/Utils";

const Farming = () => {
  const [login, setLogin] = useState(false);
  const router = useRouter();
  // const userinfo = useSelector(state => state.profile.userinfo);
  // const promotionlist = useSelector(state => state.profile.promotionlist);
  const dispatch = useDispatch();
  // const LoadUserInfo = useCallback(
  //   () => dispatch({ type: LOAD_USERINFO }),
  //   [dispatch]
  // )
  // const LoadPromotionList = useCallback(
  //   () => dispatch({ type: LOAD_PROMOTIONLIST }),
  //   [dispatch]
  // )
  // const Authorize = useCallback(async () => {
  //   const token = await Utils.GetCookie("access_token");
  //     if (!token) {
  //       router.push("/dang-nhap");
  //       return;
  //     }
  //     LoadUserInfo();
  //     LoadPromotionList();
  //     setLogin(true);
  // }, [])
  
  // useEffect(() => {
  //   Authorize();
  // }, [Authorize]);
  
  return (
    <>
      <DefaultLayout siteTitle="PolkaBridge Interface">
        <Row gutter={[30, 15]} type="flex">
          <Col xs={24} md={4} className="gutter-row">
            {/* {userinfo ? <Avatar className="employee-avatar" size="large" shape="square" src={`https://insite.thegioididong.com/cdninsite/UserImages/${userinfo.imagepath}`} /> : null} */}
          </Col>
          <Col xs={24} md={20} className="gutter-row">
            {/* <b className="employee-fullname">{userinfo ? userinfo.fullname : ""}</b><br />
            <span>@{userinfo ? userinfo.username : ""}</span><br />
            <span>{userinfo ? userinfo.position.positionname + " - " + userinfo.department.departmentname : ""}</span><br />
            <span>{userinfo ? userinfo.store.storeid + " - " + userinfo.store.storename : ""}</span><br /> */}
          </Col>
        </Row>

      </DefaultLayout>
    </>
  );
}

export default Farming;