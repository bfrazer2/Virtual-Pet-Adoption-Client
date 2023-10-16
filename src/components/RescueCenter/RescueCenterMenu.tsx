//MUI Imports
import { Tabs, TabList, Tab, TabPanel, Typography } from '@mui/joy';
import { tabClasses } from '@mui/joy/Tab';

//Native Imports
//Components
import { RescueCenter } from './RescueCenter';

//Styles
import styles from './RescueCenter.module.scss';
import { AddPetModal } from '../AddPet/AddPetModal';

export const RescueCenterMenu = () => {
  return (
    <div className={styles.rescueCenterContainer}>
        <Tabs
        variant="outlined"
        aria-label="Rescue Center Menu"
        defaultValue={0}
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
                Adopt
                </Tab>
            </TabList>
            <TabPanel value={0}>
                <RescueCenter />
            </TabPanel>
            <TabPanel value={1}>
                <Typography level="inherit">
                Best for professional developers building enterprise or data-rich
                applications.
                </Typography>
                <Typography textColor="primary.400" fontSize="xl3" fontWeight="xl" mt={1}>
                $15{' '}
                <Typography fontSize="sm" textColor="text.secondary" fontWeight="md">
                    / dev / month
                </Typography>
                </Typography>
            </TabPanel>
            <TabPanel value={2}>
                <AddPetModal />
            </TabPanel>
        </Tabs>
    </div>
  );
}