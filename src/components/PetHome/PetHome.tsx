//MUI Imports
import { Box, Card, CardCover } from '@mui/joy'

//Native Imports
//Components
import { RescueCenterMenu } from '../RescueCenter/RescueCenterMenu';

//Styles
import styles from './PetHome.module.scss';

export const PetHome = () => {
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
              <img
                src="https://cdnb.artstation.com/p/assets/images/images/020/847/245/large/shinae-hyun-wattingroom-01-1.jpg?1569402286"
                loading="lazy"
                alt=""
              />
            </CardCover>
            <RescueCenterMenu />
          </Card>
        </div>
      </Box>
    </div>
  );
}