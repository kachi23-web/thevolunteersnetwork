import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { DonationCampaign } from '../types';
import { donationCampaigns as initialDonations } from '../data';

interface AppState {
  donations: DonationCampaign[];
  isLoading: boolean;
  error: string | null;
}

interface AppContextValue extends AppState {
  updateDonation: (id: string, updates: Partial<DonationCampaign>) => void;
  addDonationAmount: (id: string, amount: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  refreshDonations: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, setState] = useState<AppState>({
    donations: initialDonations,
    isLoading: false,
    error: null,
  });

  const updateDonation = useCallback((id: string, updates: Partial<DonationCampaign>) => {
    setState((prev) => ({
      ...prev,
      donations: prev.donations.map((donation) =>
        donation.id === id ? { ...donation, ...updates } : donation
      ),
    }));
  }, []);

  const addDonationAmount = useCallback((id: string, amount: number) => {
    setState((prev) => ({
      ...prev,
      donations: prev.donations.map((donation) =>
        donation.id === id
          ? { ...donation, raised: donation.raised + amount }
          : donation
      ),
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const refreshDonations = useCallback(() => {
    setState((prev) => ({
      ...prev,
      donations: [...initialDonations],
    }));
  }, []);

  const value: AppContextValue = {
    ...state,
    updateDonation,
    addDonationAmount,
    setLoading,
    setError,
    refreshDonations,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
