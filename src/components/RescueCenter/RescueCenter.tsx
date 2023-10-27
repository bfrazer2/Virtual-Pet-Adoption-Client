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

  const { setPets, pets, triggerRefresh } = usePetContext();

  useEffect(() => {
    const fetchPets = async () => {
      const fetchedPets = await getUserPets();
      if (fetchedPets) {
        setPets(fetchedPets);
      }
    };
    fetchPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRefresh, setPets]);

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
          <CssVarsProvider theme={petCardTheme}>
            <PetCard pet={pet} />
          </CssVarsProvider>
        </Grid>
      ))}
    </Grid>
  );
};
