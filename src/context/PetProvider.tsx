import React, { ReactNode, useState, useContext } from 'react';
import { Pet } from '../requests/models';

interface PetContextValue {
  petAdded: boolean;
  setPetAdded: (value: boolean) => void;
  triggerRefresh: () => void;
  pets: Pet[];
  setPets: (pets: Pet[]) => void;
}

const PetContext = React.createContext<PetContextValue | undefined>(undefined);

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
}

export const PetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refreshPets, setRefreshPets] = useState(false);
  const [petAdded, setPetAdded] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);

  const triggerRefresh = () => {
    setRefreshPets(!refreshPets);
  }

  return (
    <PetContext.Provider value={{ petAdded, setPetAdded, triggerRefresh, pets, setPets }}>
      {children}
    </PetContext.Provider>
  );
}
