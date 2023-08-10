import React from 'react';
import { useEffect, useState } from 'react';

import Grid from '@mui/joy/Grid';

import { PetCard } from '../PetCard/PetCard';
import { getUserPets } from '../../requests/requests';

import type { Pet } from '../../requests/models';
import { Sheet } from '@mui/joy';

export const RescueCenter = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      const fetchedPets = await getUserPets();
      if (fetchedPets) {
        setPets(fetchedPets);
      }
    };
    fetchPets();
  }, []);

  return(
    <Sheet>
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
