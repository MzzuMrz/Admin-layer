import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <Typography variant="h1" component="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                ¡Oops! Parece que esta página se tomó un día libre.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Pero no te preocupes, puedes volver al trabajo utilizando el botón de abajo. ¡No le diremos a nadie que te perdiste!
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/search')}>
                Volver al inicio
            </Button>
        </Container>
    );
};

export default NotFoundPage;
