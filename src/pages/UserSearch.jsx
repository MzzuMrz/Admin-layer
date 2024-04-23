import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const UserSearch = () => {
    const [inputUid, setInputUid] = useState('');
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (inputUid) {
            navigate(`/dashboard/${inputUid}`);
        } else {
            alert("Please enter a UID to continue.");
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5em',
            marginTop: '1em',
            padding: '2em',
            borderRadius: '15px',
        }}>
            <Typography variant="h4" color="textPrimary" sx={{ fontWeight: 'bold' }}>
                Find User by UID
            </Typography>
            <TextField
                size="small"
                label="UID"
                variant="outlined"
                value={inputUid}
                onChange={(e) => setInputUid(e.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">UID-</InputAdornment>,
                }}
                error={!inputUid && inputUid !== ''}
                helperText={!inputUid && inputUid !== '' ? 'Please provide a UID' : ''}
            />
            <Button
                variant="contained"
                startIcon={<SearchIcon />}
                color="primary"
                onClick={handleNavigate}
            >
                Search User
            </Button>
        </Box>
    );
};

export default UserSearch;
