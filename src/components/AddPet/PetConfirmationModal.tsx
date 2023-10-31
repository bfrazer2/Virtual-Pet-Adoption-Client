import { FC } from 'react';

import { PetCard } from '../PetCard/PetCard'

import { Modal, Typography, Button } from '@mui/joy';

import styles from './PetConfirmationModal.module.scss';

import { Pet } from '../../requests/models';

type PetConfirmationModalProps = {
  isOpen: boolean;
  pet: Pet;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown" | "closeClick") => void;
}

export const PetConfirmationModal: FC<PetConfirmationModalProps> = ({ isOpen, pet, onClose }) => {

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="rescue-notification-modal"
    >
      <div className={styles.notificationContent}>
        <Typography level="h2" color="success" sx={{ textAlign: 'center' }}>
          You rescued {pet.name}!
        </Typography>
        <PetCard pet={pet} showReleaseButton={false} />
        <Button color="success" onClick={() => onClose({}, "closeClick")}>Hooray!</Button>
      </div>
    </Modal>
  );
};

