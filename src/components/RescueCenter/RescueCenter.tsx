//React Imports
import { useEffect } from 'react';

//MUI Imports
import { Grid, CssVarsProvider, extendTheme } from '@mui/joy';

//Native Imports
import { PetCard } from '../PetCard/PetCard';
import { useApi } from '../../requests/requests';
//Context
import { usePetContext } from '../../context/PetProvider';

export const RescueCenter = () => {
  const { getUserPets } = useApi();

  const { setPets, pets, petReleased, petAdded, petUpdated, setPetUpdated, setSelectedPet } = usePetContext();

  useEffect(() => {
    const fetchPets = async () => {
      const fetchedPets = await getUserPets();
      if (fetchedPets) {
        setPets(fetchedPets);
        setPetUpdated(false);
      }
    };
    fetchPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petReleased, petAdded, petUpdated]);

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
          success: {
            100: '#E0f2E9'
          }
        },
      },
    },
  });

  return (
    <Grid container spacing={3} sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      {pets.slice().reverse().map((pet, index) => (
        <Grid xs='auto' key={index}>
          <div onClick={(event) => {
            event.stopPropagation();
            setSelectedPet(pet);
          }}>
            <CssVarsProvider theme={petCardTheme}>
              <PetCard pet={pet} showReleaseButton={true} />
            </CssVarsProvider>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
