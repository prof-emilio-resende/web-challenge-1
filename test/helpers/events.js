export function interceptEventListeners() {
    const eventListenerList = {};
    const eventTargetEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (a, b, c) {
        console.log('adding evt listener');
        if (c == undefined) c = false;
        eventTargetEventListener(a, b, c);
        if (!eventListenerList) eventListenerList = {};
        if (!eventListenerList[a]) eventListenerList[a] = [];
        eventListenerList[a].push({ target: this, listener: b, options: c });
    };

    return eventListenerList;
}