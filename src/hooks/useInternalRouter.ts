import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type RoutePath = `/${string}`;

const useInternalRouter = () => {
  const navigate = useNavigate();
  return useMemo(() => {
    return {
      goBack() {
        navigate(-1);
      },
      push(path: string) {
        navigate(`/${path}`);
      },
      replace(path: string) {
        navigate(`/${path}`, { replace: true });
      },
    };
  }, [navigate]);
};

export default useInternalRouter;
