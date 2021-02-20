import React, { useState, useCallback, useEffect } from "react";
import { Row, Col, Card, Button, Modal, Input } from "antd";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import Utils from "../common/Utils";
import NumberInput from "../common/NumberInput";

const FarmingPoolBlock = (props) => {
    const [approved, setApproved] = useState(false);
    const [isClaim, setIsClaim] = useState(false);
    const [claimableAmount, setClaimableAmount] = useState(0);
    const [claimedAmount, setClaimedAmount] = useState(0);
    const [isDeposit, setIsDeposit] = useState(false);
    const [depositableAmount, setDepositableAmount] = useState(0);
    const [depositedAmount, setDepositedAmount] = useState(0);
    const [isWithdraw, setIsWithdraw] = useState(false);
    const [withdrawableAmount, setWithdrawableAmount] = useState(0);
    const [withdrewAmount, setWithdrewAmount] = useState(0);

    const CheckApproved = useCallback(async () => {
        if (props.approved) {
            setApproved(true);
        }
    }, [])

    const ApproveContract = () => {
        setApproved(true);
    }

    const OpenClaimModal = () => {
        setClaimedAmount(0);
        setIsClaim(true);
    }

    const ClaimOK = () => {
        console.log(claimedAmount);
    }

    const CloseClaimModal = () => {
        setIsClaim(false);
    }

    const OpenDepositModal = () => {
        setDepositedAmount(0);
        setIsDeposit(true);
    }

    const CloseDepositModal = () => {
        setIsDeposit(false);
    }

    const OpenWithdrawModal = () => {
        setWithdrewAmount(0);
        setIsWithdraw(true);
    }

    const CloseWithdrawModal = () => {
        setIsWithdraw(false);
    }

    useEffect(() => {
        CheckApproved();
    }, [CheckApproved]);

    return (
        <>
            <Card className="block">
                <Row className="block-title no-margin" gutter={[30, 15]} type="flex">
                    <Col xs={24} md={24} className="gutter-row text-center no-padding">
                        <div className="pool-token-img">
                            <img className="pool-token1-img" src={"/img/tokens/" + props.token1.toLowerCase() + ".png"} width="60" height="60"></img>
                            <img className="pool-token2-img" src={"/img/tokens/" + props.token2.toLowerCase() + ".png"} width="60" height="60"></img>
                        </div>
                        <label className="pool-title">{props.token1.toUpperCase()} - {props.token2.toUpperCase()}</label>
                        <label className="pool-description">{props.description}</label>
                    </Col>
                </Row>
                <Row className="block-content no-margin" gutter={[30, 15]} type="flex">
                    <Col xs={24} md={24} className="gutter-row no-padding">
                        <div className="block-item">
                            {!props.connected && <Button className="btn display-block margin-bottom-16">Connect wallet</Button>}
                            {props.connected && (!approved ? <Button className="btn display-block margin-bottom-16" onClick={() => ApproveContract()}>Approve contract</Button>
                                :
                                <>
                                    <div className="pool-text-group">
                                        <label className="pool-text-label">Earned</label>
                                        <label className="pool-text-value">{Utils.FormatMoney(props.earned)} PBR</label>
                                    </div>
                                    <Button className="btn display-block margin-top-6 margin-bottom-6" onClick={() => OpenClaimModal()}>Claim</Button>
                                    <div className="pool-text-group">
                                        <label className="pool-text-label">Locked</label>
                                        <label className="pool-text-value">{Utils.FormatMoney(props.locked)} {props.token1.toUpperCase()}-{props.token2.toUpperCase()} LP</label>
                                    </div>
                                    <div className="pool-text-group">
                                        <Button className="btn margin-top-6 margin-bottom-6" onClick={() => OpenWithdrawModal()}><MinusCircleFilled></MinusCircleFilled> Withdraw</Button>
                                        <Button className="btn margin-top-6 margin-bottom-6" onClick={() => OpenDepositModal()}><PlusCircleFilled></PlusCircleFilled> Deposit</Button>
                                    </div>
                                </>
                            )}
                            <div className="pool-text-group">
                                <label className="pool-text-label">Total Locked Value</label>
                                <label className="pool-text-value">${Utils.FormatMoney(props.totallocked)}</label>
                            </div>
                            <div className="pool-text-group">
                                <label className="pool-text-label">APY</label>
                                <label className="pool-text-value highlight">{Utils.FormatMoney(props.apy)}%</label>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            <Modal visible={isClaim} onOk={() => ClaimOK()} onCancel={() => CloseClaimModal()}>
                <label>Claimable reward: {Utils.FormatMoney(claimableAmount)} PBR</label>
                <NumberInput max={claimableAmount} token="PBR" onchange={(e) => setClaimedAmount(e)} />
            </Modal>

            <Modal visible={isDeposit} onOk={() => DepositOK()} onCancel={() => CloseDepositModal()}>
                <label>Balance: {Utils.FormatMoney(depositableAmount)} {props.token1.toUpperCase()}-{props.token2.toUpperCase()} LP</label>
                <NumberInput max={depositableAmount} onchange={(e) => setDepositedAmount(e)} token={props.token1.toUpperCase() + "-" + props.token2.toUpperCase() + " LP"} />
            </Modal>

            <Modal visible={isWithdraw} onOk={() => WithdrawOK()} onCancel={() => CloseWithdrawModal()}>
                <label>Locked: {Utils.FormatMoney(withdrawableAmount)} {props.token1.toUpperCase()}-{props.token2.toUpperCase()} LP</label>
                <NumberInput max={withdrawableAmount} onchange={(e) => setWithdrewAmount(e)} token={props.token1.toUpperCase() + "-" + props.token2.toUpperCase() + " LP"} />
            </Modal>
        </>
    );
}

export default FarmingPoolBlock;