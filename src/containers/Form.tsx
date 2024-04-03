import React, { useState } from 'react';
import Text from '../components/Text';
import Select from '../components/Select';
import { useNavigate, useLocation } from 'react-router-dom';
import { PokemonDetailsForTable } from '../types';
import { Box, Button } from '@mui/material';

export default function Form(props) {
    const location = useLocation();
    // * Use navigate to return root path
    const navigate = useNavigate();
    const {
        id,
        name,
        types,
        height,
        weight,
        front_default,
        pokemonsData,
        pokemonsTypesData,
        my_teammates,
    } = location.state as PokemonDetailsForTable & {
        pokemonsTypesData: string[];
        my_teammates: string[];
        pokemonsData: string[];
    };

    const { pokemonTypesOptions, tableRows, handleUpdatePokemonRow } = props;

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [newPokemonName, setNewPokemonName] = useState<string>(name);
    const [pokemonsBySelectedTypes, setPokemonsBySelectedTypes] = useState<
        string[]
    >([]);

    const handleSubmit = (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        handleUpdatePokemonRow({
            name,
            fields: {
                types: selectedTypes,
                name: newPokemonName,
            },
        });

        navigate('/');
    };

    const handleChangeName = (value: string): void => {
        setNewPokemonName(value);
    };

    const handleSetSelectedTypes = (selectedTypesValue: string[]): void => {
        setSelectedTypes(selectedTypesValue);
        console.log(selectedTypesValue);
        setPokemonsBySelectedTypes(
            pokemonsData
                .filter((pokemon: any, index: number) => {
                    const pokemonIterationTypes = pokemon.types;

                    if (
                        selectedTypesValue.every(
                            (value, index) =>
                                pokemonIterationTypes[index] &&
                                pokemonIterationTypes[index] === value
                        )
                    ) {
                        return pokemon;
                    }

                    return false;
                })
                .map((pokemon: any) => {
                    return pokemon.name;
                })
        );
    };

    return (
        <form className="formContainer">
            <Box my={4}>
                <Text
                    label={'New name'}
                    defaultValue={name}
                    handleChange={handleChangeName}
                />
            </Box>

            <Box my={4}>
                <Select
                    label={'New type'}
                    options={pokemonsTypesData}
                    defaultValue={types}
                    handleChange={handleSetSelectedTypes}
                />
            </Box>

            <Box my={4}>
                <Select
                    label={'Best teammate'}
                    defaultValue={['']}
                    options={pokemonsBySelectedTypes}
                    handleChange={() => {}}
                />
            </Box>

            {/* <ImageList defaultValue={foundPokemon.my_sprite} />  */}

            <section className={'buttonsSection'}>
                <Button
                    variant={'outlined'}
                    type={'button'}
                    onClick={() => navigate('/')}
                >
                    Go Back
                </Button>

                <Button
                    variant={'contained'}
                    type={'button'}
                    onClick={handleSubmit}
                >
                    Save Pokemon
                </Button>
            </section>
        </form>
    );
}
