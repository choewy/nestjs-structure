import { FC, useCallback, useEffect, useState } from 'react';

import { clickApiClient, clickWsClient, userApiClient } from '../persistences/clients';
import { Rank } from '../persistences/interfaces';

export const Click: FC = () => {
  const [userId, setUserId] = useState<number>(0);
  const [ranks, setRanks] = useState<Rank[]>([]);

  const beforeConnect = useCallback(async () => {
    const userId = await userApiClient.getID().catch(() => 0);

    if (userId < 1) {
      return;
    }

    setUserId(userId);
  }, [setUserId]);

  const onClick = useCallback(async () => {
    await clickApiClient.click();
  }, []);

  useEffect(() => {
    beforeConnect();
  }, [beforeConnect]);

  useEffect(() => {
    if (userId < 1 || clickWsClient.connected) {
      return;
    }

    clickWsClient.auth = { userId };
    clickWsClient.useOnException();
    clickWsClient.useOnRanks(setRanks);
    clickWsClient.connect();

    return () => {
      clickWsClient.disconnect();
    };
  }, [userId, setRanks]);

  return (
    <div>
      <button onClick={onClick}>click</button>
      <pre>{JSON.stringify(ranks, null, 2)}</pre>
    </div>
  );
};
