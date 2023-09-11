//MUI Imports
import { Box, Card, CardCover } from '@mui/joy'

//Native Imports
//Styles
import styles from './PetHome.module.scss';

export const PetHome = () => {
  return (
    <div className={styles.box}>
      <Box
        component="ul"
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: '16px' }}
      >
        <Card component="li" sx={{ minWidth: 300, flexGrow: 1, height: '500px' }}>
          <CardCover>
            <img
              src="https://cdnb.artstation.com/p/assets/images/images/020/847/245/large/shinae-hyun-wattingroom-01-1.jpg?1569402286"
              loading="lazy"
              alt=""
            />
          </CardCover>
        </Card>
      </Box>
    </div>
  );
}