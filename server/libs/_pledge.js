const Pledge = (...callbacks) => {
  const pledge = {};

  let callbackIndex = 0;
  let errorCallback = null;

  const Observer = (data) => {
    const observer = {};

    let nextCalled = false;
    let errorCalled = false;

    observer.data = data;
    observer.next = (data) => {
      if (nextCalled || errorCalled) { return; }
      nextCalled = true;
      observer.data = data;
      if (callbackIndex < callbacks.length) {
        callbacks[callbackIndex++](Observer(data));
      }
    };
    observer.error = err => {
      if (nextCalled || errorCalled) { return; }
      errorCalled = true;
      if (errorCallback) {
        errorCallback(err);
      }
    };

    return observer;
  };

  pledge.run = () => {
    if (callbacks.length) {
      callbacks[callbackIndex++](Observer());
    }
  };

  pledge.then = (callback) => {
    callbacks.push(callback);
    return pledge;
  };

  pledge.catch = (callback) => {
    errorCallback = callback;
    return pledge;
  };

  return pledge;
};

module.exports = Pledge;