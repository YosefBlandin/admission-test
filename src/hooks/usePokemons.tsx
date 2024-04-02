import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const getApiUrl = (itemsQuantity: number): string => {
    return `https://pokeapi.co/api/v2/pokemon?limit=${itemsQuantity}&offset=0`;
};

type UsePokemonsFn = () => { isLoading: boolean; data: any[]; error: unknown };

type PokemonItem = {
    name: string;
    url: string;
};

type PokemonListResponse = {
    count: number;
    next: null;
    previous: null;
    results: PokemonItem[];
};

type PokemonTypes = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
};

type PokemonDetails = {
    id: number;
    name: string;
    types: PokemonTypes[];
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
};

type PokemonDetailsForTable = Pick<PokemonDetails['sprites'], 'front_default'> &
    Pick<PokemonDetails, 'id' | 'name' | 'types' | 'height' | 'weight'>;

export const usePokemons: UsePokemonsFn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<PokemonDetailsForTable[]>([]);
    const [error, setError] = useState<unknown>(null);

    const fetchPokemons = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const {
                data: { results: ListResult },
            }: AxiosResponse<PokemonListResponse> = await axios.get(
                getApiUrl(20)
            );

            const allPokemonsData: PokemonDetailsForTable[] = [];

            ListResult.forEach(async (pokemonItem: PokemonItem) => {
                const { data }: AxiosResponse<PokemonDetails> = await axios.get(
                    pokemonItem.url
                );

                allPokemonsData.push({
                    id: data.id,
                    name: data.name,
                    types: data.types,
                    height: data.height,
                    weight: data.weight,
                    front_default: data.sprites.front_default,
                });
            });

            setData(allPokemonsData);

            setIsLoading(false);
        } catch (e: unknown) {
            setError(e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log(data);
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
