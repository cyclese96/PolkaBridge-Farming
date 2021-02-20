import cookies from "js-cookie";

const GetCookie = (key) => {
    return cookies.get(key);
}

const SetCookie = (key, value, expired) => {
    if (expired) {
        var expiredMinute = expired / 1440;
        cookies.set(key, value, { expires: expiredMinute });
    }
    else {
        cookies.set(key, value);
    }
}

const FormatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}

const StringToFloat = (money) => {
    try {
        return parseFloat(money.replace(/,/g, ""));
    }
    catch (e) {
        console.log(e);
    }
}

export default { GetCookie, SetCookie, FormatMoney, StringToFloat };