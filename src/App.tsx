import Routes from './Routes';
import './App.css';
import React, { createContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usePokemons } from './hooks/usePokemons';
import { usePokemonsTypes } from './hooks/usePokemonsTypes';
import { PokemonDetailsForTable } from './types';

export const DataContext = createContext<{
    pokemonsData: PokemonDetailsForTable[];
    pokemonsTypesData: { [key: string]: string }[];
    isLoading: boolean;
    handleDeletePokemon: (pokemonNames: string[]) => void;
    handleUpdatePokemonRow: (args: {
        name: string;
        fields: { [key: string]: string | string[] };
    }) => void;
}>({
    pokemonsData: [],
    pokemonsTypesData: [],
    isLoading: false,
    handleDeletePokemon: (pokemonNames: string[]) => {},
    handleUpdatePokemonRow: (args: {
        name: string;
        fields: { [key: string]: string | string[] };
    }) => {},
});

function App() {
    const { isLoading, data, error } = usePokemons();
    const {
        isLoading: isPokemonTypesLoading,
        data: pokemonsTypesData,
        error: pokemonTypesError,
    } = usePokemonsTypes();
    const [pokemonsData, setPokemonsData] = React.useState<
        PokemonDetailsForTable[]
    >([]);

    const handleDeletePokemon = (pokemonsName: string[]): void => {
        const newPokemonsData = pokemonsData.filter(
            ({ name }) => pokemonsName.indexOf(name) === -1
        );
        setPokemonsData(newPokemonsData);
    };

    const handleUpdatePokemonRow = ({
        name,
        fields,
    }: {
        name: string;
        fields: { [key: string]: string | string[] };
    }) => {
        const newPokemons = pokemonsData.map((pokemon) => {
            if (pokemon.name === name) {
                return {
                    ...pokemon,
                    ...fields,
                };
            }
            return pokemon;
        });
        setPokemonsData(newPokemons);
    };

    useEffect(() => {
        if (
            Array.isArray(data) &&
            data.length > 0 &&
            pokemonsData.length === 0
        ) {
            setPokemonsData(data);
        }
        console.log('CHANGE DETECTED', pokemonsData);
    }, [data, pokemonsData]);

    return (
        <DataContext.Provider
            value={{
                pokemonsData: [...pokemonsData],
                pokemonsTypesData: [...pokemonsTypesData],
                isLoading: isPokemonTypesLoading || isLoading,
                handleDeletePokemon,
                handleUpdatePokemonRow,
            }}
        >
            <div className="App">
                <Routes />
                <Outlet />
            </div>
        </DataContext.Provider>
    );
}

export default App;
