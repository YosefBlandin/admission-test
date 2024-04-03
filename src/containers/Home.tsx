import React, { useContext, useEffect } from 'react';
import EnhancedTable from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../App';

export default function Home() {
    const { pokemonsData, pokemonsTypesData, isLoading, handleDeletePokemon } =
        useContext(DataContext);

    console.log('HOME DATA', pokemonsData);

    const navigate = useNavigate();

    const handleEditButton = (row: any) => (e: any) => {
        e.stopPropagation();
        const {
            html_image,
            html_types,
            html_my_sprite,
            html_my_types,
            html_my_teammates,
            ...params
        } = row;
        navigate(`form/${row.name}`, {
            state: {
                ...params,
                pokemonsData: pokemonsData.map((pokemon) => ({
                    name: pokemon.name,
                    types: pokemon.types,
                })),
                pokemonsTypesData,
            },
        });
    };

    useEffect(() => {}, [pokemonsData]);

    return (
        <div className="homeContainer">
            {isLoading
                ? 'Loading...'
                : Array.isArray(pokemonsData) &&
                  pokemonsData.length > 0 && (
                      <EnhancedTable
                          rowsProp={pokemonsData as any}
                          handleEditButton={handleEditButton}
                          handleDeleteElement={handleDeletePokemon}
                      />
                  )}
        </div>
    );
}
