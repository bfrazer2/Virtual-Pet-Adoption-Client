//React Imports
import { useState, useEffect } from 'react';

// Mui Imports
import {
  Typography,
  Card,
  AspectRatio,
} from '@mui/joy';

// Native Imports
// Types
import { PreviewPet } from '../../requests/models';
//Styles
import styles from './PreviewPetCard.module.scss';



type PreviewPetCardProps = {
  previewPet: PreviewPet;
}

export const PreviewPetCard: React.FC<PreviewPetCardProps> = ({ previewPet }) => {
  const [backgroundImageStyles, setBackgroundImageStyles] = useState({});

  useEffect(() => {
    const colorFrameMapping = (pet: PreviewPet) => {
      let frames: string[] = [];
      if (pet.color === "Coloration 1") {
        frames = pet.breed === "Dog" ? ['000', '001', '002'] : ['048', '049', '050'];
      } else if (pet.color === "Coloration 2") {
        frames = pet.breed === "Dog" ? ['003', '004', '005'] : ['051', '052', '053'];
      } else {
        frames = pet.breed === "Dog" ? ['006', '007', '008'] : ['054', '055', '056'];
      }

      const yPos = pet.breed === "Dog" ? '30px' : '-70px';

      setBackgroundImageStyles({
        '--tile0': `url(/assets/tile${frames[0]}.png)`,
        '--tile1': `url(/assets/tile${frames[1]}.png)`,
        '--tile2': `url(/assets/tile${frames[2]}.png)`,
        '--yPos': yPos
      } as React.CSSProperties);
    };

    colorFrameMapping(previewPet);
  }, [previewPet]);

  return (
    <Card variant="outlined" sx={{ minWidth: 250, margin: 0 }}>
      <div>
        <Typography level="title-lg">{previewPet.name}</Typography>
        <Typography level="body-sm">{previewPet.breed}</Typography>
      </div>
      <AspectRatio ratio="1">
        <div className={styles.spriteAnimation} style={backgroundImageStyles} />
      </AspectRatio >
    </Card >
  );
};

