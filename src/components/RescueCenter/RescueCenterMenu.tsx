//React Imports
import { useState, useEffect } from 'react';

//Transition Imports
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//MUI Imports
import { Tabs, TabList, Tab, TabPanel } from '@mui/joy';
import { tabClasses } from '@mui/joy/Tab';

//Native Imports
//Context
import { usePetContext } from '../../context/PetProvider';

//Components
import { RescueCenter } from './RescueCenter';
import { PetConfirmationModal } from '../AddPet/PetConfirmationModal';

//Styles
import styles from './RescueCenter.module.scss';
import { AddPetForm } from '../AddPet/AddPetForm';

export const RescueCenterMenu = () => {

    const { petAdded, setPetAdded } = usePetContext();
    const [currentTab, setCurrentTab] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [newPet, setNewPet] = useState(false);

    const { pets } = usePetContext();

    // Check if a pet was added and navigate to Kennels tab
    useEffect(() => {
        if (petAdded) {
            setCurrentTab(0); // Navigate to Kennels tab
            setShowModal(true); // Show confirmation modal
            setNewPet(petAdded);
            setPetAdded(false); // Reset the petAdded flag
        }
    }, [petAdded, setPetAdded]);

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.rescueCenterContainer}>
            <Tabs
                variant="outlined"
                aria-label="Rescue Center Menu"
                value={currentTab}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'number') {
                        setCurrentTab(newValue);
                    }
                }}
                sx={{
                    width: 343,
                    borderRadius: 'md',
                    boxShadow: 'sm',
                    overflow: 'auto',
                    height: '80vh'
                }}
            >
                <TabList
                    disableUnderline
                    tabFlex={1}
                    sx={{
                        [`& .${tabClasses.root}`]: {
                            fontSize: 'sm',
                            fontWeight: 'lg',
                            [`&[aria-selected="true"]`]: {
                                color: 'primary.500',
                                bgcolor: 'background.surface',
                            },
                            [`&.${tabClasses.focusVisible}`]: {
                                outlineOffset: '-4px',
                            },
                        },
                    }}
                >
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                        Kennels
                    </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                        Shop
                    </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                        Rescue
                    </Tab>
                </TabList>
                <TransitionGroup>
                    {currentTab === 0 && (
                        <CSSTransition
                            key={0}
                            timeout={300}
                            classNames="fade"
                        >
                            <TabPanel className={styles.rescueCenter} value={0}>
                                <RescueCenter />
                            </TabPanel>
                        </CSSTransition>
                    )}
                    {currentTab === 1 && (
                        <CSSTransition
                            key={1}
                            timeout={300}
                            classNames="fade"
                        >
                            <TabPanel value={1}>
                                {/* ... (Your TabPanel content) */}
                            </TabPanel>
                        </CSSTransition>
                    )}
                    {currentTab === 2 && (
                        <CSSTransition
                            key={2}
                            timeout={300}
                            classNames="fade"
                        >
                            <TabPanel value={2}>
                                <AddPetForm />
                            </TabPanel>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </Tabs>
            {pets && pets.length > 0 ?
                <PetConfirmationModal
                    isOpen={showModal}
                    pet={pets[pets.length - 1]}
                    onClose={closeModal}
                />
                : null}
        </div>
    );
}
