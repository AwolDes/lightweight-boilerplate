export const successResponse = (body) => {
  const response = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body),
    isBase64Encoded: false,
  };
  return response;
};

export const errResponse = (err) => {
  const response = {
    statusCode: 404,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ err }),
    isBase64Encoded: false,
  };
  return response;
};

