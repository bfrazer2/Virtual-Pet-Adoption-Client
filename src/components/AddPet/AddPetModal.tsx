//React Imports
import { useRef, useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color';

//MUI Imports
import { Button, Input, Modal, ModalClose, Option, Select, Sheet } from '@mui/joy';

//Native Imports
//Requests
import { useApi } from '../../requests/requests';
//Context
import { usePetContext } from '../../context/PetProvider';

//Style Imports
import styles from './AddPetModal.module.scss';

export const AddPetModal = () => {
    //Server Requests
    const { createPet } = useApi();

    //Modal State
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //Form States
    const [species, setSpecies] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [primaryColor, setPrimaryColor] = useState<string>('');
    const [displayPrimaryColorPicker, setDisplayPrimaryColorPicker] = useState<boolean>(false);
    const [secondaryColor, setSecondaryColor] = useState<string>('');
    const [displaySecondaryColorPicker, setDisplaySecondaryColorPicker] = useState<boolean>(false);

    //Refs
    const primaryPickerRef = useRef<HTMLDivElement | null>(null);
    const secondaryPickerRef = useRef<HTMLDivElement | null>(null);
    const primaryButtonRef = useRef<HTMLButtonElement | null>(null);
    const secondaryButtonRef = useRef<HTMLButtonElement | null>(null);

    //Context
    const triggerRefresh = usePetContext();

    const handleSpeciesChange = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element> | null, value: any) => {
        if (value) {
            setSpecies(value);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAge(event.target.value);
    };

    const handlePrimaryColorOpen = () => {
        if (displaySecondaryColorPicker) {
            setDisplaySecondaryColorPicker(false);
        }
        setDisplayPrimaryColorPicker(!displayPrimaryColorPicker);
    };

    const handlePrimaryColorClose = () => {
        setDisplayPrimaryColorPicker(false);
    };

    const handlePrimaryColorChange = (color: any) => {
        setPrimaryColor(color.hex);
    };

    const handleSecondaryColorOpen = () => {
        if (displayPrimaryColorPicker) {
            setDisplayPrimaryColorPicker(false);
        }
        setDisplaySecondaryColorPicker(!displaySecondaryColorPicker);
    };

    const handleSecondaryColorClose = () => {
        setDisplaySecondaryColorPicker(false);
    };

    const handleSecondaryColorChange = (color: any) => {
        console.log(color.hex);
        setSecondaryColor(color.hex);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const petData = {
            name: name,
            breed: species,
            age: Number(age),
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
        };

        console.log(petData);
    
        try {
            const newPet = await createPet(petData);
            if (newPet) {
              setIsOpen(false);
              triggerRefresh();
            } else {
              console.error("Failed to create pet.");
            }
        } catch (error) {
            console.error("Error creating pet:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (primaryPickerRef.current && !primaryPickerRef.current.contains(event.target) && !primaryButtonRef.current?.contains(event.target)) {
                handlePrimaryColorClose();
            }
            if (secondaryPickerRef.current && !secondaryPickerRef.current.contains(event.target) && !secondaryButtonRef.current?.contains(event.target)) {
                handleSecondaryColorClose();
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    

    return(
        <>
            <Button variant="outlined" color="neutral" onClick={() => setIsOpen(true)}>
            Open modal
            </Button>
            <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                    minWidth: 275,
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.surface',
                    }}
                    />
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Input placeholder="Name your new pet!" variant="outlined" color="neutral" required onChange={handleNameChange}/>
                        <Input placeholder="How old is your new pet?" variant="outlined" color="neutral" required onChange={handleAgeChange} />
                        <div className={styles.colorPickerButtonsWrapper}>
                            <div className={styles.colorPickerWrapper}>
                                <Button ref={primaryButtonRef} onMouseDown={ handlePrimaryColorOpen } type="button" style={{ backgroundColor: primaryColor }}>Pet Primary Color</Button>
                                { displayPrimaryColorPicker ? 
                                    <div ref={primaryPickerRef} className={styles.popOver}>
                                        <TwitterPicker onChange={handlePrimaryColorChange} color={primaryColor}/>
                                    </div> 
                                : null }
                            </div>
                                <div className={styles.colorPickerWrapper}>
                                    <Button ref={secondaryButtonRef} onMouseDown={ handleSecondaryColorOpen } type="button" style={{ backgroundColor: secondaryColor }}>Pet Secondary Color</Button>
                                    { displaySecondaryColorPicker ? 
                                        <div ref={secondaryPickerRef} className={styles.popOver}>
                                            <TwitterPicker onChange={handleSecondaryColorChange} color={secondaryColor} />
                                        </div> 
                                : null }
                            </div>
                        </div>
                        <Select 
                        placeholder="Species"
                        onChange={handleSpeciesChange}>
                            <Option value="dog">Dog</Option>
                            <Option value="cat">Cat</Option>
                        </Select>
                        <Button className={styles.submitButton} type="submit" color="success">Rescue this pet!</Button>
                    </form>
                </Sheet>
            </Modal>
        </>
    );
};
