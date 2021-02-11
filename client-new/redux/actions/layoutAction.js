//Action Types
export const TOGGLE = "TOGGLE";
export const CONNECT_WALLET = "CONNECT_WALLET";
export const CONNECT_WALLET_SUCCESS = "CONNECT_WALLET_SUCCESS";

//Action Creator
export function Toggle() {
    return {
        type: TOGGLE
    };
}

export function ConnectWallet() {
    return {
        type: CONNECT_WALLET
    };
}