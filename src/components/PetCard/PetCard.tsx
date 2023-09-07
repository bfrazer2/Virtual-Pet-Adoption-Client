//React Imports
import { useState, FC } from 'react';

//Mui Imports
import { 
  Typography, 
  IconButton, 
  CardContent, 
  Card, 
  Button, 
  AspectRatio,
  AccordionGroup,
  Accordion,
  AccordionSummary,
  accordionSummaryClasses,
  AccordionDetails,
  accordionDetailsClasses,
  Stack,
  LinearProgress
} from '@mui/joy';
import { Edit, Favorite } from '@mui/icons-material';
import { CardActions } from '@mui/material';
import { createTheme } from '@mui/system';

//Native Imports
//Requests
import { useApi } from '../../requests/requests';
//Context
import { usePetContext } from '../../context/PetProvider';
//Type
import { Pet } from '../../requests/models';
//Styles
import styles from './PetCard.module.scss';

type PetCardProps = {
  pet: Pet;
}

export const PetCard: FC<PetCardProps> = ({ pet }) => {
  const [isFavorite, setIsFavorite] = useState(pet.favorite)

  const { editPet } = useApi()
  const triggerRefresh = usePetContext();


  const handleFavoriteToggle = async () => {
    setIsFavorite(!isFavorite);

    try {
      const newPet = await editPet(pet.id, {favorite: isFavorite});
      if (newPet) {
        triggerRefresh();
      } else {
        console.error("Failed to create pet.");
      }
    } catch (error) {
        console.error("Error setting pet as favorite: ", error);
    }
  };

  const handleFeed = async () => {
    let newHunger = pet.hunger + 50;
    if (newHunger > 100) {
      newHunger = 100
    }

    try {
      const newPet = await editPet(pet.id, {hunger: newHunger});
      if (newPet) {
        triggerRefresh();
      } else {
        console.error("Failed to create pet.");
      }
    } catch (error) {
        console.error("Error setting pet as favorite: ", error);
    }
  };

  const handleWater = async () => {
    let newThirst = pet.thirst + 50;
    if (newThirst > 100) {
      newThirst = 100
    }

    try {
      const newPet = await editPet(pet.id, {thirst: newThirst});
      if (newPet) {
        triggerRefresh();
      } else {
        console.error("Failed to create pet.");
      }
    } catch (error) {
        console.error("Error setting pet as favorite: ", error);
    }
  };

  const handlePet = async () => {
    let newFriendship = pet.friendship + 5;
    if (newFriendship > 100) {
      newFriendship = 100
    }

    try {
      const newPet = await editPet(pet.id, {friendship: newFriendship});
      if (newPet) {
        triggerRefresh();
      } else {
        console.error("Failed to create pet.");
      }
    } catch (error) {
        console.error("Error setting pet as favorite: ", error);
    }
  };

  const getWellbeingColor = (value: number) => {
    switch (true) {
      case (value < 10):
        return "danger";
      case (value >= 10 && value < 50):
        return "warning";
      case (value >= 50 && value < 80):
        return "neutral";
      case (value >= 80 && value <= 100):
        return "primary";
      default:
          console.log("Number is out of the specified range");
    }
  };

  const buttonStyling = { ml: 'auto', alignSelf: 'center', fontSize: '24px', fontWeight: 600, width: '33%', padding: '2px',}

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
      <CardContent orientation="vertical">
        <CardActions sx={{display: 'flex', padding: '8px 0 8px 0', gap: '4px'}}>
          <IconButton
            aria-label="Favorite This Pet"
            variant= {isFavorite ? 'solid' : 'outlined'}
            size="sm"
            sx={{ 
                position: 'absolute', top: '0.875rem', right: '0.5rem', color: 'rgb(227,27,35)' }}
            onClick={handleFavoriteToggle}
          >
            <Favorite />
          </IconButton>
          <div className={styles.interactionButtons}>
            <Button
              variant="solid"
              size="md"
              color="success"
              aria-label="Explore Bahamas Islands"
              sx={{ ...buttonStyling, margin: '0' }}
              onClick={handlePet}
            >
              Pet
            </Button>
            <Button
              variant="solid"
              size="md"
              color="success"
              aria-label="Explore Bahamas Islands"
              sx={ buttonStyling }
              onClick={handleFeed}
            >
              Feed
            </Button>
            <Button
              variant="solid"
              size="md"
              color="success"
              aria-label="Explore Bahamas Islands"
              sx={ buttonStyling }
              onClick={handleWater}
            >
              Water
            </Button>
          </div>
        </CardActions>
        <AccordionGroup
          variant="outlined"
          transition="0.2s"
          sx={{
            maxWidth: 400,
            borderRadius: 'lg',
            [`& .${accordionSummaryClasses.button}:hover`]: {
              bgcolor: 'transparent',
            },
            [`& .${accordionDetailsClasses.content}`]: {
              boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
              [`&.${accordionDetailsClasses.expanded}`]: {
                paddingBlock: '0.75rem',
              },
            },
          }}
        >
          <Accordion defaultExpanded>
            <AccordionSummary>
              <Typography
                fontWeight="xl"
                textColor="common.black"
                sx={{ zIndex: '1000' }}
              >
                Health Chart
              </Typography>
            </AccordionSummary>
            <AccordionDetails variant="soft">
              <Stack spacing={2} sx={{ flex: 1 }}>
                <LinearProgress 
                  determinate 
                  value={pet.hunger} 
                  thickness={20} 
                  color={getWellbeingColor(pet.hunger)} 
                  sx={{ boxShadow: 'sm' }}>
                  <Typography
                    level="body-xs"
                    fontWeight="xl"
                    textColor="common.black"
                    sx={{ zIndex: '1000' }}
                  >
                    Hunger: {pet.hunger}
                  </Typography>
                </LinearProgress>
                <LinearProgress 
                  determinate 
                  value={pet.thirst} 
                  thickness={20}
                  color={getWellbeingColor(pet.thirst)} 
                  sx={{ boxShadow: 'sm' }}>
                  <Typography
                    level="body-xs"
                    fontWeight="xl"
                    textColor="common.black"
                    sx={{ zIndex: '1000' }}
                  >
                    Thirst: {pet.thirst}
                  </Typography>
                </LinearProgress>
                <LinearProgress 
                  determinate 
                  value={pet.friendship} 
                  thickness={20}
                  color={getWellbeingColor(pet.friendship)}
                  sx={{ boxShadow: 'sm' }}>
                  <Typography
                    level="body-xs"
                    fontWeight="xl"
                    textColor="common.black"
                    sx={{ zIndex: '1000' }}
                  >
                    Friendship: {pet.friendship}
                  </Typography>
                </LinearProgress>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
    </CardContent>
  </Card>
  );
};