const log = store => next => action => {
  !PRODUCTION && console.log(action);
  next(action);
};

export default log;
