function getAuthHeaderConfig(token) {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return config
}

export default getAuthHeaderConfig;
