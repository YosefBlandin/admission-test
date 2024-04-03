import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Text({
    label,
    defaultValue,
    handleChange,
}: {
    label: string;
    defaultValue: string;
    handleChange: (value: string) => void;
}) {
    return (
        <Box component="form" noValidate autoComplete="off">
            <div>
                <TextField
                    // error
                    // id="standard-error-helper-text"
                    fullWidth={true}
                    label={label}
                    onChange={(e: any) => handleChange(e.target.value)}
                    defaultValue={defaultValue}
                    helperText="Incorrect entry."
                    variant={'outlined'}
                    // rows={5}
                    // multiline={true}
                />
            </div>
        </Box>
    );
}
