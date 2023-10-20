//React Imports
import { useState, useEffect, useRef } from 'react';

//MUI Imports
import { Button, Input, Option, Select } from '@mui/joy';

//Native Imports
//Requests
import { useApi } from '../../requests/requests';
//Context
import { usePetContext } from '../../context/PetProvider';

//Style Imports
import styles from './AddPetModal.module.scss';
import { SpriteCreator } from '../Sprites/SpriteCreator';

export const AddPetModal = () => {
    //Refs
    const modalSizeRef = useRef(null);

    //Server Requests
    const { createPet } = useApi();

    //Form States
    const [species, setSpecies] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');

    //Context
    const triggerRefresh = usePetContext();

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (modalSizeRef.current) {
            const { offsetWidth: width, offsetHeight: height } = modalSizeRef.current;
            setDimensions({ width, height });
        }
    }, [modalSizeRef]);

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const petData = {
            name: name,
            breed: species,
            age: Number(age),
        };

        console.log(petData);

        try {
            const newPet = await createPet(petData);
            if (newPet) {
                triggerRefresh();
            } else {
                console.error("Failed to create pet.");
            }
        } catch (error) {
            console.error("Error creating pet:", error);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit} ref={modalSizeRef}>
                <Input placeholder="Name your new pet!" variant="outlined" color="neutral" required onChange={handleNameChange} />
                <Input placeholder="How old is your new pet?" variant="outlined" color="neutral" required onChange={handleAgeChange} />
                <Select
                    className={styles.select}
                    placeholder="Species"
                    onChange={handleSpeciesChange}>
                    <Option value="Dog">Dog</Option>
                    <Option value="Cat">Cat</Option>
                </Select>
                <div className={styles.petPreview}>
                    <SpriteCreator dimensions={dimensions} />
                </div>
                <Button className={styles.submitButton} type="submit" color="success">Rescue this pet!</Button>
            </form>
        </>
    );
};
