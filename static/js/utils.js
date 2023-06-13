window.detectMobile = function () {
    return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i))
}