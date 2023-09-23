import { useState } from 'react';

import { Login } from './components/Login';
import { Click } from './components/Click';

export default function App() {
  const [auth, setAuth] = useState<boolean>(false);

  return <div>{auth === false ? <Login setAuth={setAuth} /> : <Click />}</div>;
}
