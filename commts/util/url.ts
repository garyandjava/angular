export function buildUrl(url, data) {
    return url.replace(/:([a-z]\w*)/gi,
        function (id, paramName) {
            if (paramName.indexOf('__') > -1) {
                let arr = paramName.split('__');
                let result = data;
                arr.forEach(item => {
                    result = result[item];
                });
                return result || "";
            } else {
                return (data[paramName] || "");
            }
        })
        .replace(/(^|[^:])[\/]{2,}/g, "$1/")
        .replace(/\/+$/i, "");
}

export function buildQuery(url, data, queryStringArr) {
    url += '?';
    queryStringArr.forEach(queryString => {
        url += queryString + "=" + (data[queryString] || '') + '&';
    });

    return url.replace(/[\&]{2,}/g, "&")
        .replace(/&+$/i, "")
        .replace(/\?+$/i, "");
}

export function appendQuery(uri, key, value) {
    let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    let separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}