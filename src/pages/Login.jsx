import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import { auth, db } from '../../firebaseConfig';
import firebase from 'firebase/compat/app';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        setLoading(true);
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await auth.signInWithPopup(provider);
            const userEmail = result.user.email;

            const userDocRef = doc(db, 'allowedUsers', userEmail);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await auth.signOut();
                setError('Acceso denegado. El correo electrónico no está registrado.');
            } else {
                alert("Inicio de sesión exitoso");
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.message);
            alert("Error en inicio de sesión con Google: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Example Tracker
                </Typography>
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                <Box
                    sx={{
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {loading ? (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    ) : (
                        <Button
                            onClick={signInWithGoogle}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, position: 'relative' }}
                            disabled={loading}
                        >
                            Iniciar sesión con Google
                        </Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
