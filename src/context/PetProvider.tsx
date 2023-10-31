import React, { ReactNode, useState, useContext } from 'react';
import { Pet } from '../requests/models';

interface PetContextValue {
  petAdded: boolean;
  setPetAdded: (value: boolean) => void;
  triggerRefresh: () => void;
  pets: Pet[];
  setPets: (pets: Pet[]) => void;
  petReleased: boolean;
  setPetReleased: (value: boolean) => void;
  petUpdated: boolean;
  setPetUpdated: (value: boolean) => void;
  selectedPet: Pet;
  setSelectedPet: (value: Pet) => void;
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
  const [petReleased, setPetReleased] = useState(false);
  const [petUpdated, setPetUpdated] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet>(pets.slice().reverse()[0]);

  const triggerRefresh = () => {
    setRefreshPets(!refreshPets);
  }

  return (
    <PetContext.Provider value={{
      petAdded,
      setPetAdded,
      triggerRefresh,
      pets,
      setPets,
      petReleased,
      setPetReleased,
      petUpdated,
      setPetUpdated,
      selectedPet,
      setSelectedPet,
    }}>
      {children}
    </PetContext.Provider>
  );
}
