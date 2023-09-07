//React Imports
import { useEffect, useState } from 'react';

//MUI Imports
import { Grid, Sheet, CssVarsProvider, extendTheme, Typography } from '@mui/joy';

//Native Imports
import { PetCard } from '../PetCard/PetCard';
import { useApi } from '../../requests/requests';
import { AddPetModal } from '../AddPet/AddPetModal';
//Context
import { usePetContext } from '../../context/PetProvider';
//Type
import type { Pet } from '../../requests/models';
//Styles
import styles from './RescueCenter.module.scss';

export const RescueCenter = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const { getUserPets } = useApi();

  const triggerRefresh = usePetContext();
  
  useEffect(() => {
    const fetchPets = async () => {
      const fetchedPets = await getUserPets();
      if (fetchedPets) {
        setPets(fetchedPets);
      }
    };
    fetchPets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRefresh]);

  const petCardTheme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          danger: {
            700: '#FF4C4C',
          },
          warning: {
            700: '#FFD833',
          },
          neutral: {
            700: '#A9A9A9',
          },
          primary: {
            700: '#4CAF50'
          },
        },
      },
    },
  });

  return(
    <Sheet color='neutral'>
      <div className={styles.sheetHeader}>
        <Typography
        level='h2'
        fontWeight="xl"
        textColor="common.black"
        sx={{ zIndex: '1000' }}>
          Rescue Center
        </Typography>
        <AddPetModal/>
      </div>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {pets.map((pet, index) => (
          <Grid xs={4} key={index}>
            <CssVarsProvider theme={petCardTheme}>
              <PetCard pet={pet} />
            </CssVarsProvider>
          </Grid>
        ))}
      </Grid>
    </Sheet>
  );
};
