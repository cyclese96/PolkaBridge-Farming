import { TOGGLE, CONNECT_WALLET_SUCCESS } from "../actions/layoutAction";

const initialState = {
    collapsed: false,
    wallet: null
};

function GetShortAddress(address) {
    let shortAddress = "";

    if (address) {
        shortAddress = address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
    }

    return shortAddress;
}

function GetEtherscanLink(address) {
    let etherscanLink = "";

    if (address) {
        etherscanLink = "https://etherscan.io/address/" + address;
    }

    return etherscanLink;
}

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE:
            var newCollapsed = !state.collapsed;
            return { ...state, collapsed: newCollapsed }
        case CONNECT_WALLET_SUCCESS:
            var newWallet = action.data;
            newWallet.shortAddress = GetShortAddress(newWallet.address);
            newWallet.etherscanLink = GetEtherscanLink(newWallet.address);
            Utils.SetCookie("wallet_data", JSON.stringify(newWallet), 20);
            console.log(newWallet);
            return { ...state, wallet: newWallet }
        default:
            return { ...state };
    }
};

export default layoutReducer;