//Native Imports
//Components
import { PetHome } from '../PetHome/PetHome';
//Styles
import styles from './Dashboard.module.scss';

export const DashBoard = () => {

  return (
    <div className={styles.dashBoard}>
      <div className={styles.sheet}>
        <PetHome />
      </div>
    </div>
  );
};