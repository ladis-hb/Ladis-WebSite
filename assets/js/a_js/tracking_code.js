

function getTrackData(data, action) {
    var dataArr = data.split("/");
    var td = dataArr.pop();
    if (action != "link") {
        if (action == "go") {
            td = td;
        } else {
            td = "qx" + td;
        }
    } else {
        td = td;
    }
    dataArr.push(td);
    return dataArr.join("/");
}
function getTrackEventData(data, action) {
    var ted;
    if (action != "link") {
        if (action == "go") {
            ted = data + "-确定";
        } else {
            ted = data + "-取消";
        }
    } else {
        ted = data;
    }
    return ted;
}

function sendTrackInfo(o, action) {
    var _this = o;
    var trackEventData,trackData;
    var _trackEventDataLastOne,_trackDataLastOne;

    if (!!$(_this).attr("data-trackEvent")) {
        trackEventData = $(_this).attr("data-trackEvent").split(",");
        _trackEventDataLastOne = getTrackEventData(trackEventData[2], action);
        _gsq.push(["T", _gsDevice, "trackEvent", trackEventData[0], trackEventData[1], _trackEventDataLastOne]);
    }
    if (!!$(_this).attr("data-track")) {
        trackData = $(_this).attr("data-track").split(",");
        _trackDataLastOne = getTrackData(trackData[0], action);
        if (trackData.length > 1) {
            trackData = _trackDataLastOne + location.pathname
        } else {
            trackData = _trackDataLastOne;
        }
        _gsq.push(["T", _gsDevice, "track", trackData]);
    }
    var targetURL = $(_this).attr("href");
    if (targetURL && action != "cancel") {
        if ($(_this).attr("target") == "_blank") {
            var newWindow = window.open('about:blank', '_blank');
            newWindow.blur();
            newWindow.opener.focus();
            newWindow.location = targetURL;
        } else {
            window.location = targetURL;
        }
    }
}
