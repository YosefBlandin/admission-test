import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

type UsePokemonsFn = () => { isLoading: boolean; data: any[]; error: unknown };

export const usePokemons: UsePokemonsFn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<unknown>(null);

    const fetchPokemons = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const { data: resultData } = await axios.get(API_URL);

            setData(resultData);

            setIsLoading(false);
        } catch (e: unknown) {
            setError(e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (data.length === 0) {
            fetchPokemons();
        }
    }, [data]);

    return {
        isLoading,
        data,
        error,
    };
};
