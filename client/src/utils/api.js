import rp from 'request-promise';

const createOptions = ({ endpoint, data, method }) => ({
  uri: `${process.env.REACT_APP_API_URL}/${endpoint}`,
  method,
  json: true,
  headers: {
    'User-Agent': 'lightweight-boilerplate',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  body: data
});

export const get = async (endpoint) => rp(
  createOptions({
    endpoint,
    method: 'GET'
  })
).catch(({ error }) => Promise.reject(error));

export const patch = async (endpoint, data) => rp(
  createOptions({
    endpoint,
    method: 'PATCH',
    data,
  })
).catch(({ error }) => Promise.reject(error));

export const post = async (endpoint, data) => rp(
  createOptions({
    endpoint,
    method: 'POST',
    data,
  })
).catch(({ error }) => Promise.reject(error));
