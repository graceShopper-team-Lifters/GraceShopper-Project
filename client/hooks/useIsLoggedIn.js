import { useSelector } from 'react-redux';

export function useIsLoggedIn() {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.me.id));
  return isLoggedIn;
}
