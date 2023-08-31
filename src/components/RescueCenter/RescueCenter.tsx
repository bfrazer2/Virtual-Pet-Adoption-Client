//React Imports
import { useEffect, useState } from 'react';

//MUI Imports
import { Grid, Sheet } from '@mui/joy';

//Native Imports
import { PetCard } from '../PetCard/PetCard';
import { useApi } from '../../requests/requests';
import { AddPetModal } from '../AddPet/AddPetModal';

//useContext
import { usePetContext } from '../../context/PetProvider';

//Type Imports
import type { Pet } from '../../requests/models';

export const RescueCenter = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const { getUserPets } = useApi();

  const refresh = usePetContext();
  
  useEffect(() => {
    console.log('FETCH USEEFFECT HERE')
    const fetchPets = async () => {
      const fetchedPets = await getUserPets();
      if (fetchedPets) {
        setPets(fetchedPets);
      }
    };
    fetchPets();
  }, [refresh]);

  return(
    <Sheet color='neutral'>
      <AddPetModal/>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {pets.map((pet, index) => (
          <Grid xs={4} key={index}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>
    </Sheet>
  );
};
