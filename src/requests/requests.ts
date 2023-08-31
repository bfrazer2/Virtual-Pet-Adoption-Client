import type { Pet } from "./models";
import { BASE_PATH } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserPets = async (): Promise<Pet[] | undefined> => {
    try {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${BASE_PATH}/pets`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data: Pet[] = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Fetch a specific pet with its associated user
  const getSpecificPet = async (petId: number): Promise<Pet | undefined> => {
    try {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${BASE_PATH}/pets/${petId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data: Pet = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Create a new pet
  const createPet = async (petData: Omit<Pet, 'id'>): Promise<Pet | undefined> => {
    try {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${BASE_PATH}/pets`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify(petData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data: Pet = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Delete a specific pet
  const deletePet = async (petId: number): Promise<string | undefined> => {
    try {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${BASE_PATH}/pets/${petId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        return data.message;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Edit a specific pet
  const editPet = async (petId: number, updatedData: Partial<Pet>): Promise<Pet | undefined> => {
    try {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${BASE_PATH}/pets/${petId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify(updatedData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data: Pet = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return {
    getUserPets,
    getSpecificPet,
    createPet,
    deletePet,
    editPet
  };
};
