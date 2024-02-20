const handleSuccess = (data, login, navigate) => {
  const { token, username } = data;
  login(token, username);
  navigate('/');
};

export default handleSuccess;
