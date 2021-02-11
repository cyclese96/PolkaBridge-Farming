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

export default { GetCookie, SetCookie };