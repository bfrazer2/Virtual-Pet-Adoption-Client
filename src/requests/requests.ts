import type { Pet } from "./models";
import { BASE_PATH } from "../constants"; 

export const getUserPets = async (): Promise<Pet[] | undefined> => {
  try {
    const tokenResponse = await fetch(`${BASE_PATH}/token`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!tokenResponse.ok) {
      throw new Error(`HTTP error! status: ${tokenResponse.status}`);
    }

    const { accessToken } = await tokenResponse.json();

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
