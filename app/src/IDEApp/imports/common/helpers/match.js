export default function match(options, def) {
  return function check(message) {
    const keys = Object.keys(options);
    const target = keys.find((key) => {
      const regexp = new RegExp(key, 'gmi');
      return regexp.test(message.type);
    });
    let handler = typeof def === 'function' ? def : () => {};
    if (target) {
      handler = options[target];
    }

    return handler(message);
  };
}

