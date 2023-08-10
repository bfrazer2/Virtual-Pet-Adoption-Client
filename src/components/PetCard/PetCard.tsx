//React Imports
import { useState, FC } from 'react';

//Mui Imports
import { 
  Typography, 
  IconButton, 
  CardContent, 
  Card, 
  Button, 
  AspectRatio } from '@mui/joy';
import { Edit, Favorite } from '@mui/icons-material';
import { CardActions } from '@mui/material';

//Type Imports
import { Pet } from '../../requests/models';

type PetCardProps = {
  pet: Pet;
}

export const PetCard: FC<PetCardProps> = ({ pet }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  return(
      <Card variant="outlined" sx={{ width: 320 }}>
        <div>
          <Typography level="title-lg">{pet.name}</Typography>
          <Typography level="body-sm">{pet.breed}</Typography>
          <IconButton
            aria-label="Favorite This Pet"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
          >
            <Edit />
          </IconButton>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <img
            // src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
            // srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
            // loading="lazy"
            // alt=""
          />
        </AspectRatio>
        <CardContent orientation="horizontal">
          <CardActions>
            <IconButton
              aria-label="Favorite This Pet"
              variant= {isFavorite ? 'solid' : 'outlined'}
              size="sm"
              sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem', color: 'rgb(227,27,35)' }}
            >
              <Favorite />
            </IconButton>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >
              Wellbeing
            </Button>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >
              Interact
            </Button>
          </CardActions>
        </CardContent>
      </Card>
  );
};