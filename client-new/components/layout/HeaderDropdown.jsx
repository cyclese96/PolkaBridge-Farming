import { Dropdown } from 'antd';
import React from 'react';

const HeaderDropdown = (props) => {
    return (
        <>
            <Dropdown className={props.className} overlay={props.overlayttem} trigger={props.triggers}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {props.children}
                </a>
            </Dropdown>
        </>
    );
}

export default HeaderDropdown;
