const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:30000',
});

const pick = (length) => {
  return Math.floor(Math.random() * length);
};

const main = async () => {
  const ids = new Array(50).fill(null).map((_, i) => i);

  let tokens = [];

  for (const id of ids) {
    const cretentials = {
      username: `username_${id}`,
      password: `password_${id}`,
    };

    let token = '';

    try {
      const { data } = await api.post('/auth/signin', cretentials);

      token = data.data.accessToken;
    } catch (e) {
      console.log(`${id} : signin failed - ${JSON.stringify(e.response.data)}`);

      const { data } = await api.post('/auth/signup', { ...cretentials, name: `name_${id}` }).catch((e) => {
        console.log(`${id} : signup failed - ${JSON.stringify(e.response.data)}`);

        return { data: { data: { accessToken: null } } };
      });

      token = data.data.accessToken;
    }

    tokens[id] = token;
  }

  tokens = tokens.filter((token) => !!token);

  const length = tokens.length;

  if (length === 0) {
    return;
  }

  const count = 2000;

  let success = 0;
  let failed = 0;

  let requestCount = 0;

  while (true) {
    if (requestCount === count) {
      break;
    }

    requestCount += 1;

    const targetIdxs = new Array(5).fill(0).map(() => pick(length));
    const targetTokens = targetIdxs.map((idx) => tokens[idx]);

    console.log(`${((requestCount / count) * 100).toFixed(2)}%`);

    for (const token of targetTokens) {
      await api
        .patch('/click', null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          success += 1;
        })
        .catch(() => {
          failed += 1;
        });
    }
  }

  console.log({ requestCount, success, failed });
};

main();
