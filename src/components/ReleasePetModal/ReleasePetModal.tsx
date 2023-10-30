//React Imports
import { FC, useEffect, useState } from 'react';

//MUI Joy Imports
import { Modal, Typography, Button } from '@mui/joy';

//Native Imports
//Components
import { PetCard } from '../PetCard/PetCard'

//Requests
import { useApi } from '../../requests/requests';

//Context
import { usePetContext } from '../../context/PetProvider';

//Type Imports
import { Pet } from '../../requests/models';

//Styles
import styles from './ReleasePetModal.module.scss';


type ReleasePetModalProps = {
  isOpen: boolean;
  pet: Pet;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown" | "closeClick") => void;
}

export const ReleasePetModal: FC<ReleasePetModalProps> = ({ isOpen, pet, onClose }) => {
  const { deletePet } = useApi()
  const { petReleased, setPetReleased } = usePetContext();

  const [petName, setPetName] = useState('');

  useEffect(() => {
    setPetName(pet.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRelease = async () => {

    try {
      const releasedPet = await deletePet(pet.id);
      if (releasedPet) {
        setPetReleased(true);
      } else {
        console.error("Failed to release pet.");
      }
    } catch (error) {
      console.error("Error releasing pet: ", error);
    }
  };

  const handleReleaseModalClose = () => {
    setPetReleased(false);
    onClose({}, "closeClick")
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="release-pet-notification-modal"
    >
      <div className={styles.notificationContent}>
        {!petReleased ?
          <div>
            <Typography level="h3" color="neutral" sx={{ textAlign: 'center' }}>
              Are you sure you want to release {pet.name} to another loving home?
            </Typography>
            <Typography level="h4" color="neutral" sx={{ textAlign: 'center' }}>
              You cannot undo this decision.
            </Typography>
          </div>
          :
          <Typography level="h2" color="success" sx={{ textAlign: 'center' }}>
            {petName} loves their new family, and they're so grateful to you for helping them along the way!
          </Typography>
        }
        {!petReleased ?
          <PetCard pet={pet} showReleaseButton={false} />
          : null}
        {!petReleased ?
          <div className={styles.ctaButtons}>
            <Button color="danger" onClick={() => handleRelease()}>Release</Button>
            <Button color="neutral" onClick={() => handleReleaseModalClose()}>Cancel</Button>
          </div>
          :
          <Button color="success" onClick={() => handleReleaseModalClose()}>Close</Button>
        }
      </div>
    </Modal>
  );
};
