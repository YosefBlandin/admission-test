import React, { useContext, useState } from 'react';
import Text from '../components/Text';
import Select from '../components/Select';
import { useNavigate, useLocation } from 'react-router-dom';
import { PokemonDetailsForTable } from '../types';
import { Box, Button, Typography } from '@mui/material';
import { DataContext } from '../App';
import StandardImageList from '../components/ImageList';

export default function Form() {
    const location = useLocation();
    // * Use navigate to return root path
    const navigate = useNavigate();
    const { handleUpdatePokemonRow } = useContext(DataContext);
    const {
        name,
        types,
        pokemonsData,
        pokemonsTypesData,
        description,
        friends,
        sprites,
        front_default,
    } = location.state as PokemonDetailsForTable & {
        pokemonsTypesData: string[];
        my_teammates: string[];
        pokemonsData: string[];
        sprites: { title: string; img: string }[];
    };

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedImg, setSelectedImg] = useState<string>(front_default);
    const [selectedFriends, setSelectedFriends] = useState<string[]>(
        friends ?? []
    );
    const [newPokemonName, setNewPokemonName] = useState<string>(name);
    const [newPokemonDescription, setNewPokemonDescription] =
        useState(description);
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
                description: newPokemonDescription ? newPokemonDescription : '',
                friends: selectedFriends,
                front_default: selectedImg,
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

    const handleChangeDescription = (value: string): void => {
        setNewPokemonDescription(value);
    };

    const handleChangeFriends = (selectedFriends: string[]): void => {
        setSelectedFriends(selectedFriends);
    };

    const handleChangeImg = (img: string): any => {
        setSelectedImg(img);
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
                    defaultValue={selectedFriends}
                    options={pokemonsBySelectedTypes}
                    handleChange={handleChangeFriends}
                />
            </Box>

            <Box my={4}>
                <Text
                    label={'Description'}
                    defaultValue={
                        newPokemonDescription ? newPokemonDescription : ''
                    }
                    handleChange={handleChangeDescription}
                />
            </Box>

            <Typography
                textAlign={'start'}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                Change Pokemon Image
            </Typography>

            <StandardImageList
                defaultValue={selectedImg}
                handleChange={handleChangeImg}
                list={sprites}
            />

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
