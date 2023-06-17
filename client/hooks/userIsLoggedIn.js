import { useSelector } from 'react-redux';

export function userIsLoggedIn() {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.me.id));
  return isLoggedIn;
}
