import type { Pet } from "./models";
import { BASE_PATH } from "../constants"; 

const getAccessToken = async () => {
  const tokenResponse = await fetch(`${BASE_PATH}/token`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  });

  if (!tokenResponse.ok) {
    throw new Error(`HTTP error! status: ${tokenResponse.status}`);
  }

  const { accessToken } = await tokenResponse.json();
  return accessToken;
}


export const getUserPets = async (): Promise<Pet[] | undefined> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${BASE_PATH}/pets`, {
      method: 'GET',
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
export const getSpecificPet = async (petId: number): Promise<Pet | undefined> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${BASE_PATH}/pets/${petId}`, {
      method: 'GET',
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
export const createPet = async (petData: Omit<Pet, 'id'>): Promise<Pet | undefined> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${BASE_PATH}/pets`, {
      method: 'POST',
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
export const deletePet = async (petId: number): Promise<string | undefined> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${BASE_PATH}/pets/${petId}`, {
      method: 'DELETE',
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
export const editPet = async (petId: number, updatedData: Partial<Pet>): Promise<Pet | undefined> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${BASE_PATH}/pets/${petId}`, {
      method: 'PUT',
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