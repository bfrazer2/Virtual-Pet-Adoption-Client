//MUI Imports
import { Box, Card, CardCover } from '@mui/joy'

//Native Imports
//Components
import { RescueCenterMenu } from '../RescueCenter/RescueCenterMenu';
import { PetWalking } from '../PetWalking/PetWalking';
//Context
import { usePetContext } from '../../context/PetProvider';

//Styles
import styles from './PetHome.module.scss';

export const PetHome = () => {

  const { selectedPet } = usePetContext();

  return (
    <div>
      <Box
        component="ul"
        className={styles.petHomeContainer}
      >
        <div className={styles.petHome} >
          <Card component="li" className={styles.petRoom} sx={{ borderRadius: 'md', boxShadow: 'md' }}
          >
            <CardCover>
              <div className={styles.animationWindow}>
                <img
                  src="https://cdnb.artstation.com/p/assets/images/images/020/847/245/large/shinae-hyun-wattingroom-01-1.jpg?1569402286"
                  loading="lazy"
                  alt=""
                />
                {selectedPet ?
                  <div className={styles.petSprite}>
                    <PetWalking pet={selectedPet} spriteLeft="-50px 0" spriteRight="0 0" />
                  </div>
                  : null}
              </div>
            </CardCover>
            <RescueCenterMenu />
          </Card>
        </div>
      </Box>
    </div>
  );
}