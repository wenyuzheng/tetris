export default (callBack, holdDelay, intervalTimer) => {
    let timeOut = null;
    let interval = null;

    const onMouseDownHandler = () => {
        timeOut = setTimeout(() => {
            timeOut = null;
            interval = setInterval(() => { callBack() }, intervalTimer)
        }, holdDelay)
    }

    const onMouseUpHandler = () => {
        if (timeOut) {
            clearTimeout(timeOut);
            callBack();
        } else {
            clearInterval(interval);
        }
    } 

    return [onMouseDownHandler, onMouseUpHandler]
}