import { useEffect, useReducer } from 'react';

function loadingReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        response: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        response: action.response,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        response: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(reqObjs, deps = []) {
  // reqObjs: array with axios request objects, Promise objects
  // deps: useEffect dependencies, variables that triggers useEffect
  const [state, dispatch] = useReducer(loadingReducer, {
    loading: false,
    response: null,
    error: null,
  });

  const sendRequestAsync = (promises) => {
    dispatch({ type: 'LOADING' });
    Promise.all(promises())
      .then((response) => {
        dispatch({
          type: 'SUCCESS',
          response,
        });
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', error: err });
      });
  };

  useEffect(() => sendRequestAsync(reqObjs), deps);
  return { state };
}

export default useAsync;
