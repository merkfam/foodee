export const HANDLE_RESPONSE = (response, res) => {
  const send = JSON.stringify(response);
  return res.send(send);
};

export const HANDLE_SIGNUP_RESPONSE = (response, res, filter, update) => {
  let send = JSON.stringify({ ...response, ...update });
  return res.send(send);
};

export const HANDLE_LOGIN_RESPONSE = (response, res, filter, update) => {
  const send = { ...response, ...update };
  res.send(send);
  return;
};

export const RETURN_DATA = (response, client) => {
  client.close();
  return response;
};

export const RETURN_OPTIONS = (
  response,
  res,
  response_type,
  HANDLER_FUNC,
  client,
  update
) => {
  client.close();
  if (response_type === "send") {
    return HANDLER_FUNC(response, res);
  } else if (response_type === "return") {
    return RETURN_DATA(response, client);
  } else {
    throw SyntaxError(
      `${response_type} is not a valid option for response_type`
    );
  }
};
