const getToken = () => localStorage.getItem('token');

export const REQUEST = async (url, method, body) => {
  const token = getToken();

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(body && { 'Content-Type': 'application/json' }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (response.status < 200 || response.status >= 300) {
      const error = await response.json();
      throw { ...error, statusCode: response.status };
    }

    /* This try catch block was introduced so REST calls that returns NO data will still go through (if they were successful) */
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }
    return data;
  } catch (e) {
    throw e;
  }
};

const errorHandler = (error, e) => {
  if (error && typeof error === 'object') {
    error.forEach((f) => dispatch(f(e)));
  } else if (error) {
    dispatch(error(e));
  }
};

const api = (store) => (next) => async (action) => {
  const { dispatch } = store;
  if (action.type !== 'API') return next(action);

  const {
    payload: {
      url,
      success,
      error,
      method = 'get',
      body,
      cached = null,
      ttl = Date.now() - 1,
      silent = false,
      attempts = 1,
      attemptDelay = 2000,
    },
  } = action;

  let attempt = 1;

  const call = async (attempts, attempt) => {
    try {
      let data;
      data = await REQUEST(url, method, body, contextType);
      if (data) {
        if (success && typeof success === 'object') {
          success.forEach((f) => dispatch(f(data)));
        } else if (success) {
          dispatch(success(data));
        }
      } else {
        setTimeout(() => call(null, null), 2000);
      }
    } catch (e) {
      if (e.statusCode && e.statusCode !== 404) {
        console.error('<Api middleware error>', e);
        errorHandler(error, e);
        if (attempts == -1 || (attempts > 0 && attempt < attempts)) {
          setTimeout(() => call(attempts, ++attempt), attemptDelay);
        }
      } else {
        errorHandler(error, e);
      }
    }
  };

  call(attempts, attempt);
};

export default api;
