import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Select as MaterialSelect } from '@mui/material';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: any, personName: any, theme: any) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function Select({
    label,
    defaultValue,
    options,
    handleChange,
}: {
    label: string;
    defaultValue: any[];
    options: string[];
    handleChange: (value: any) => void;
}) {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = React.useState([]);

    const handleValueChange = (value: any) => {
        setSelectedOption(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
        handleChange(value);
    };

    useEffect(() => {
        if (options) {
            handleValueChange(defaultValue.filter((value: string) => value));
        }
    }, [options, defaultValue]);

    return (
        <div>
            <InputLabel
                id="demo-simple-select-label"
                style={{ textAlign: 'start' }}
            >
                {label}
            </InputLabel>
            <MaterialSelect
                labelId="demo-simple-select-label"
                id="demo-multiple-chip"
                fullWidth={true}
                multiple
                label={label}
                onChange={(event) => handleValueChange(event.target.value)}
                defaultValue={defaultValue}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value: any) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {options &&
                    options.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            style={getStyles(option, selectedOption, theme)}
                        >
                            {option}
                        </MenuItem>
                    ))}
            </MaterialSelect>
        </div>
    );
}
