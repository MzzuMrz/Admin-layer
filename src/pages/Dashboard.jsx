import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { auth } from '../../firebaseConfig';
import UserForm from './UserForm';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CustomBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5em',
    marginTop: '1em',
    padding: '2em',
    borderRadius: '15px',
});

const Dashboard = () => {
    const { uid } = useParams();
    const [userHealthData, setUserHealthData] = useState(null);
    const [url, setUrl] = useState(null);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState()
    const navigate = useNavigate();

    const apiHealthUrl = import.meta.env.VITE_HEALTH_API_URL;
    const apiCotineUrl = import.meta.env.VITE_COTINE_API_URL;
    const apiReliefUrl = import.meta.env.VITE_RELIEF_API_URL;

    const getProductUrl = (product) => {
        switch (product) {
            case "MC":
                setValid(false)
                return apiCotineUrl;
            case "MR":
                setValid(true)
                return apiReliefUrl;
            default:
                console.log("Producto enrolado no reconocido o no especificado");
                return null;
        }
    };

    useEffect(() => {
        const handleSearch = async () => {
            if (!uid) {
                navigate('/search');
                return;
            }

            setLoading(true);
            try {
                const user = auth.currentUser;
                if (user) {
                    const token = await user.getIdToken();
                    const response = await axios.get(`${apiHealthUrl}readItem?uid=${uid}`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    if (response.data) {
                        setUserHealthData(response.data);
                        setUrl(getProductUrl(response.data[0].product_enrolled));
                    } else {
                        navigate('/search');
                    }
                } else {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/search');
            } finally {
                setLoading(false);
            }
        };

        handleSearch();
    }, [uid, navigate, apiHealthUrl]);

    useEffect(() => {
        const fetchData = async () => {
            if (!uid || !url) return;

            setLoading(true);
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await axios.get(`${url}readItems?uid=${uid}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.data) {
                    setProductData(response.data);
                } else {
                    navigate('/search');
                }
            } catch (error) {
                alert(`Cannot edit state from ${productData === 'MR' ? 'Relief' : 'Cotine'} but you can edit other fields!`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [uid, url, navigate]);

    return (
        <CustomBox>
            {loading ? (
                <CircularProgress />
            ) : userHealthData ? (
                <UserForm userHealthData={userHealthData} productData={productData} valid={valid} url={url} />
            ) : (
                <Typography variant="body1">Loading user data...</Typography>
            )}
        </CustomBox>
    );
};

export default Dashboard;
