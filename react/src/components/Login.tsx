import { FC, ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

import { authApiClient, cookie } from '../persistences/clients';

export const Login: FC<{
  setAuth: Dispatch<SetStateAction<boolean>>;
}> = ({ setAuth }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = Number(e.target.value);

      if (isNaN(inputValue)) {
        return;
      }

      setInputValue(inputValue.toString());
    },
    [setInputValue],
  );

  const onSignIn = useCallback(async () => {
    const userId = Number(inputValue);

    if (isNaN(userId)) {
      return;
    }

    let token = await authApiClient.signIn(userId).catch(() => null);

    if (!token) {
      token = await authApiClient.signUp(userId).catch(() => null);
    }

    if (!token) {
      return;
    }

    cookie.set('token', token);
    setAuth(true);
  }, [inputValue, setAuth]);

  return (
    <div>
      <input value={inputValue} onChange={onChange} />
      <button onClick={onSignIn}>signin</button>
    </div>
  );
};
