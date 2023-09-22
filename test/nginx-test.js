const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:30000',
});

const main = async () => {
  const count = 1000;

  const ids = [1, 2, 3, 4, 5];
  const tokens = {};

  for (const id of ids) {
    const cretentials = {
      username: `username_${id}`,
      password: `password_${id}`,
    };

    let token = '';

    try {
      const { data } = await api.post('/auth/signup', { ...cretentials, name: `name_${id}` });
      token = data.data.accessToken;
    } catch (e) {
      console.log(`${id} : signup failed - ${JSON.stringify(e.response.data)}`);

      const { data } = await api.post('/auth/signin', cretentials).catch((e) => {
        console.log(`${id} : signin failed - ${JSON.stringify(e.response.data)}`);

        return { data: { data: { accessToken: null } } };
      });

      token = data.data.accessToken;
    }

    if (token) {
      tokens[id] = token;
    } else {
      delete tokens[id];
    }
  }

  if (Object.keys(tokens).length === 0) {
    return;
  }

  let requestCount = 0;

  while (true) {
    if (requestCount === count) {
      break;
    }

    requestCount += 1;

    await Promise.all(
      Object.entries(tokens).map(([id, token]) =>
        api
          .patch('/click', null, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => `${id} : success`)
          .catch(() => `${id} : failed`),
      ),
    );
  }
};

main();
