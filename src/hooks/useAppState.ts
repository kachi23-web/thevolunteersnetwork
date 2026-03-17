import { useApp } from '../contexts';

export const useAppState = () => {
  return useApp();
};

export const useDonations = () => {
  const { donations, updateDonation, addDonationAmount } = useApp();
  return { donations, updateDonation, addDonationAmount };
};

export const useLoadingState = () => {
  const { isLoading, setLoading } = useApp();
  return { isLoading, setLoading };
};

export const useErrorState = () => {
  const { error, setError } = useApp();
  return { error, setError };
};
