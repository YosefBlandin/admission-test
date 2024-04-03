import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import {
    PokemonDetails,
    PokemonDetailsForTable,
    PokemonItem,
    PokemonListResponse,
    UsePokemonsFn,
} from '../types';

const getApiUrl = (itemsQuantity: number): string => {
    return `https://pokeapi.co/api/v2/pokemon?limit=${itemsQuantity}&offset=0`;
};

export const usePokemons: UsePokemonsFn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<PokemonDetailsForTable[]>([]);
    const [error, setError] = useState<unknown>(null);

    const fetchPokemons = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const {
                data: { results: listResult },
            }: AxiosResponse<PokemonListResponse> = await axios.get(
                getApiUrl(15)
            );

            const allPokemonsData: PokemonDetailsForTable[] = [];

            listResult.forEach(
                async (pokemonItem: PokemonItem, index: number) => {
                    const { data }: AxiosResponse<PokemonDetails> =
                        await axios.get(pokemonItem.url);

                    allPokemonsData.push({
                        id: data.id,
                        name: data.name,
                        friends: [],
                        description: '',
                        types: data.types.map((type) => {
                            return type.type.name;
                        }),
                        height: data.height,
                        weight: data.weight,
                        front_default: data.sprites.front_default,
                    });

                    if (listResult.length === allPokemonsData.length) {
                        setData(allPokemonsData);
                        setIsLoading(false);
                    }
                }
            );
        } catch (e: unknown) {
            setError(e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (data.length === 0 && !isLoading) {
            fetchPokemons();
        }
    }, [data, isLoading]);

    return {
        isLoading,
        data,
        error,
    };
};
