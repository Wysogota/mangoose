module.exports.inveromentAction = (options) => {
  const { local, firebase } = options;

  switch (process.env.INVEROMENT || 'local') {
    case 'local': {
      if (local) {
        local.action();
      }
      break;
    }
    case 'firebase': {
      if (firebase) {
        firebase.action();
      }
      break;
    }
    default: break;
  }
};