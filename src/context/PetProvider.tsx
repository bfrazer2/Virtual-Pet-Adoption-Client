import React, { ReactNode } from 'react';

const PetContext = React.createContext(() => {});

export const usePetContext = () => {
  return React.useContext(PetContext);
}

export const PetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refreshPets, setRefreshPets] = React.useState(false);

  const triggerRefresh = () => {
    setRefreshPets(!refreshPets);
  }

  return (
    <PetContext.Provider value={triggerRefresh}>
      {children}
    </PetContext.Provider>
  );
}
