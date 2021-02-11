import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Head from "next/head";
import Link from "next/link";
import Utils from "../components/common/Utils";
import { TOGGLE, CONNECT_WALLET } from '../redux/actions/layoutAction';
import { Layout, Menu, Drawer, BackTop } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, TeamOutlined, UpCircleOutlined, SwapOutlined, DollarCircleOutlined, UnorderedListOutlined, DollarCircleFilled } from "@ant-design/icons";
import ConnectWalletButton from "../components/layout/ConnectWalletButton";

const DefaultLayout = (props) => {
    const [wallet, setWallet] = useState(false);
    const { collapsed } = useSelector(state => state.layout);
    const dispatch = useDispatch();
    const Toggle = useCallback(
        () => dispatch({ type: TOGGLE }),
        [dispatch]
    )
    const ConnectWallet = useCallback(
        () => dispatch({ type: CONNECT_WALLET }),
        [dispatch]
    )
    const Authorize = useCallback(async () => {
        const wallet = await Utils.GetCookie("wallet");
        if (wallet) {
            walletData = JSON.parse(walletStr);
            return;
        }
        // ConnectWallet();
        setWallet(wallet);
    }, [])

    const { children, siteTitle } = props;
    const menu = <Menu mode="inline">
        <Menu.Item key="1">
            <span>
                <SwapOutlined />
                <span>
                    <Link href="/swap">
                        <a>Swap</a>
                    </Link>
                </span>
            </span>
        </Menu.Item>
        <Menu.Item key="2">
            <span>
                <DollarCircleOutlined />
                <span>
                    <Link href="/farming">
                        <a>Farming</a>
                    </Link>
                </span>
            </span>
        </Menu.Item>
        <Menu.Item key="3">
            <span>
                <UnorderedListOutlined />
                <span>
                    <Link href="/launchpad">
                        <a>Launchpad</a>
                    </Link>
                </span>
            </span>
        </Menu.Item>
        <Menu.Item key="4">
            <span>
                <DollarCircleFilled />
                <span>
                    <Link href="/lending">
                        <a>Lending</a>
                    </Link>
                </span>
            </span>
        </Menu.Item>
        {/* <Menu.Item key="5">
            <span>
                <TeamOutlined />
                <span>
                    <Link href="/prediction">
                        <a>Prediction</a>
                    </Link>
                </span>
            </span>
        </Menu.Item> */}
    </Menu>;

    useEffect(() => {
        Authorize();
    }, [Authorize]);

    return (
        <>
            <Head>
                <title>{siteTitle}</title>
                <link rel="icon" href="/img/symbol.png" />
            </Head>
            <Layout className="ant-layout ant-layout-has-sider" theme="dark">
                <Layout.Sider id="sider" width={256} breakpoint="md" collapsedWidth={76} trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        {/* <Link href="/">
                            <a> */}
                        {(!collapsed) ? <img src="/img/logo-white.png" alt="logo" width="109" height="28" /> : <img src="/img/symbol.png" alt="logo" width="28" height="28" />}
                        {/* </a>
                        </Link> */}
                    </div>
                    {menu}
                </Layout.Sider>
                <Drawer placement="left"
                    closable={false}
                    onClose={Toggle}
                    visible={!collapsed}>
                    <Layout.Sider width={256} breakpoint="md" collapsedWidth={76} trigger={null} collapsible collapsed={collapsed}>
                        <div className="logo">
                            {/* <Link href="/">
                                <a> */}
                            {(!collapsed) ? <img src="/img/logo-white.png" alt="logo" width="109" height="28" /> : <img src="/img/symbol.png" alt="logo" width="28" height="28" />}
                            {/* </a>
                            </Link> */}
                        </div>
                        {menu}
                    </Layout.Sider>
                </Drawer>
                <Layout className="site-layout">
                    <Layout.Header className="site-header-background">
                        <div className="responsive-logo">
                            {/* <Link href="/">
                                <a> */}
                            <img src="/img/symbol.png" alt="logo" width="28" height="28" />
                            {/* </a>
                            </Link> */}
                        </div>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: Toggle,
                        })}
                        <ConnectWalletButton onClick={() => ConnectWallet()} wallet={wallet}></ConnectWalletButton>
                    </Layout.Header>
                    <Layout.Content className="site-layout-background">
                        {children}
                        <BackTop>
                            <UpCircleOutlined />
                        </BackTop>
                    </Layout.Content>
                    <Layout.Footer style={{ textAlign: 'center', color: '#fff' }}>PolkaBridge ©2021</Layout.Footer>
                </Layout>
            </Layout>
        </>
    );
}

export default DefaultLayout;