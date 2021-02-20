import React, { useState } from "react";
import Utils from "../common/Utils";

const NumberInput = (props) => {
    const [value, setValue] = useState("");
    const [label, setLabel] = useState("");

    const ChangeValue = (v) => {
        let flt = Utils.StringToFloat(v);
        setValue(flt);
        setLabel(Utils.FormatMoney(flt));
        props.onchange(flt);
    }

    const FillMax = () => {
        ChangeValue(props.max);
    }

    return (
        <>
            <div className="exchange-form__input-group">
                <div className="exchange-form__input">
                    <input type="number" step="any" value={label} onChange={(e) => ChangeValue(e.target.value)} placeholder="0.0" />
                    <button className="exchange-form__max" onClick={() => FillMax()}>Max</button>
                </div>
                <div className="exchange-form__token">{props.token}</div>
            </div>
        </>
    );
}

export default NumberInput;