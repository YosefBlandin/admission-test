import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { PokemonListResponse, UsePokemonsTypesFn } from '../types';

const getApiUrl = (): string => {
    return `https://pokeapi.co/api/v2/type/`;
};

export const usePokemonsTypes: UsePokemonsTypesFn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<string[]>([]);
    const [error, setError] = useState<unknown>(null);

    const fetchPokemonsTypes = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const {
                data: { results: listResult },
            }: AxiosResponse<PokemonListResponse> = await axios.get(
                getApiUrl()
            );
            setData(
                listResult.map((pokemonType) => {
                    return pokemonType.name;
                })
            );
            setIsLoading(false);
        } catch (e: unknown) {
            setError(e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (data.length === 0 && !isLoading) {
            fetchPokemonsTypes();
        }
    }, [data, isLoading]);

    return {
        isLoading,
        data,
        error,
    };
};
