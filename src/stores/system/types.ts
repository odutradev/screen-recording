export interface SystemStoreData {
  theme: "light" | "dark"; 
  checkUserTheme: boolean;
  menuOpen: boolean;
  loading: boolean;
};

export interface SystemStore {
  updateSystem: (partialSystem: Partial<SystemStoreData>) => void;
  setLoading: (currentLoading?: boolean) => void;
  setSystem: (system: SystemStoreData) => void;
  system: SystemStoreData;
  reset: () => void;
};