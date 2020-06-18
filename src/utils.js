const Utils = {
  uuid() {
    /* eslint no-bitwise: ["error", { "int32Hint": true }] */
    let i;
    let random;
    let uuid = '';

    for (i = 0; i < 32; i += 1) {
      random = (Math.random() * 16) | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      // eslint-disable-next-line
      uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(
        16
      );
    }

    return uuid;
  },

  pluralize(count, word) {
    return count === 1 ? word : `${word}s`;
  },

  store(namespace, data) {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    }

    const store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
  },
};

export default Utils;
