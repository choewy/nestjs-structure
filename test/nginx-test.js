const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:30000',
});

const pick = (length) => {
  return Math.floor(Math.random() * length);
};

const getTokens = async (length) => {
  const idxs = new Array(length).fill(null).map((_, i) => i);

  let tokens = [];

  for (const idx of idxs) {
    const userId = idx + 1;

    const cretentials = {
      username: `username_${userId}`,
      password: `password_${userId}`,
    };

    let token = '';

    try {
      const { data } = await api.post('/auth/signin', cretentials);

      token = data.data.accessToken;
    } catch (e) {
      console.log(`${userId} : signin failed - ${JSON.stringify(e.response.data)}`);

      const { data } = await api.post('/auth/signup', { ...cretentials, name: `name_${userId}` }).catch((e) => {
        console.log(`${userId} : signup failed - ${JSON.stringify(e.response.data)}`);

        return { data: { data: { accessToken: null } } };
      });

      token = data.data.accessToken;
    }

    tokens[idx] = token;
  }

  return tokens.filter((token) => !!token);
};

const sendClicks = async (tokens, sendCount, pickCount) => {
  const tokenCount = tokens.length;

  let requestCount = 0;
  let success = 0;
  let failed = 0;

  while (true) {
    if (requestCount === sendCount) {
      break;
    }

    requestCount += 1;

    const targetIdxs = new Array(pickCount).fill(0).map(() => pick(tokenCount));
    const targetTokens = targetIdxs.map((idx) => tokens[idx]);

    console.log(`${((requestCount / sendCount) * 100).toFixed(2)}%`);

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

  return {
    tokenCount,
    pickCount,
    sendCount,
    results: {
      requestCount,
      success,
      failed,
    },
  };
};

const main = async () => {
  const tokens = await getTokens(50);

  if (tokens.length === 0) {
    return;
  }

  const tryCount = 4000;
  const pickCount = 5;

  console.log(await sendClicks(tokens, tryCount, pickCount));
};

main();
