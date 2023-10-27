//React Imports
import { useState, useRef } from 'react';

//MUI Imports
import { Button, Input, Option, Select } from '@mui/joy';

//Native Imports
//Requests
import { useApi } from '../../requests/requests';
//Context
import { usePetContext } from '../../context/PetProvider';
//Style Imports
import styles from './AddPetForm.module.scss';
//Components
import { PreviewPetCard } from '../PreviewPetCard/PreviewPetCard';

export const AddPetForm = () => {
    //Refs
    const modalSizeRef = useRef(null);

    //Server Requests
    const { createPet } = useApi();

    //Form States
    const [species, setSpecies] = useState<string>('Dog');
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [color, setColor] = useState<string>('Coloration 1');

    //Context
    const { triggerRefresh, setPetAdded } = usePetContext();

    const handleSpeciesChange = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element> | null, value: any) => {
        if (value) {
            setSpecies(value);
        }
    };

    const handleColorChange = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element> | null, value: any) => {
        if (value) {
            setColor(value);
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
            color: color,
        };

        try {
            const newPet = await createPet(petData);
            if (newPet) {
                setSpecies('Dog');
                setName('');
                setAge('');
                setColor('Coloration 1');
                setPetAdded(true);
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
                <Input
                    placeholder="Name your new pet!"
                    variant="outlined"
                    color="neutral"
                    required
                    onChange={handleNameChange}
                    value={name} />
                <Input
                    placeholder="How old is your new pet?"
                    variant="outlined"
                    color="neutral"
                    required
                    onChange={handleAgeChange}
                    value={age} />
                <Select
                    className={styles.select}
                    placeholder="Species"
                    onChange={handleSpeciesChange}
                    value={species}>
                    <Option value="Dog">Dog</Option>
                    <Option value="Cat">Cat</Option>
                </Select>
                <Select
                    className={styles.select}
                    placeholder="Color"
                    onChange={handleColorChange}
                    value={color}
                    disabled={!species}>
                    <Option value="Coloration 1">Coloration 1</Option>
                    <Option value="Coloration 2">Coloration 2</Option>
                    <Option value="Coloration 3">Coloration 3</Option>
                </Select>
                <div className={styles.petPreview}>
                    <PreviewPetCard previewPet={{ name, age: Number(age), breed: species, color }} />
                </div>
                <Button className={styles.submitButton} type="submit" color="success">Rescue this pet!</Button>
            </form>
        </>
    );
};
