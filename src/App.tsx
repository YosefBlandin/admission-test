import Routes from './Routes';
import './App.css';
import Text from './components/Text';
import EnhancedTable from './components/Table';
import Dialog from './components/Dialog';
import React, { createContext, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { usePokemons } from './hooks/usePokemons';
import { usePokemonsTypes } from './hooks/usePokemonsTypes';
import { PokemonDetailsForTable } from './types';

export const DataContext = createContext<{
    pokemonsData: PokemonDetailsForTable[];
    pokemonsTypesData: { [key: string]: string }[];
    isLoading: boolean;
}>({ pokemonsData: [], pokemonsTypesData: [], isLoading: false });

function App() {
    const { isLoading, data, error } = usePokemons();
    const {
        isLoading: isPokemonTypesLoading,
        data: pokemonsTypesData,
        error: pokemonTypesError,
    } = usePokemonsTypes();
    const [tableRows, setTableRows] = React.useState([]);
    const [pokemonsData, setPokemonsData] = React.useState<
        PokemonDetailsForTable[]
    >([]);

    const handleUpdatePokemonRow = ({
        name,
        fields,
    }: {
        name: string;
        fields: { [key: string]: string | number };
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
        if (Array.isArray(data) && data.length > 0) {
            setPokemonsData(data);
        }
    }, [data]);

    return (
        <DataContext.Provider
            value={{
                pokemonsData,
                pokemonsTypesData,
                isLoading: isPokemonTypesLoading || isLoading,
            }}
        >
            <div className="App">
                <Routes
                    tableRows={tableRows}
                    handleUpdatePokemonRow={handleUpdatePokemonRow}
                />
                <Outlet />
            </div>
        </DataContext.Provider>
    );
}

export default App;
