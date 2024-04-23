import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Paper,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import axios from "axios";

import SendIcon from "@mui/icons-material/Send";

const UserForm = ({ userHealthData, productData, valid, url }) => {
  const [formHealthValues, setFormHealthValues] = useState([]);
  const [mappedProductData, setMappedProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [nestedObject, nestedKey] = name.split(".");

      setFormHealthValues({
        ...formHealthValues,
        [nestedObject]: {
          ...formHealthValues[nestedObject],
          [nestedKey]: value,
        },
      });
    } else {
      setFormHealthValues({
        ...formHealthValues,
        [name]: value,
      });
    }
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [nestedObject, nestedKey] = name.split(".");

      setMappedProductData({
        ...mappedProductData,
        [nestedObject]: {
          ...mappedProductData[nestedObject],
          [nestedKey]: value,
        },
      });
    } else {
      setMappedProductData({
        ...mappedProductData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let healthDataToSend = { ...formHealthValues };
    let productDataToSend = { ...mappedProductData };

    const excludeKeys = [
      "uid",
      "created_at",
      "updated_at",
      "verification_at",
      "expiration_at",
      "shipping",
      "last_mr_score_changed_at",
      "last_stress_changed_at",
      "program_started_at",
      "last_resilience_changed_at",
    ];
    excludeKeys.forEach((key) => {
      delete healthDataToSend[key];
      delete productDataToSend[key];
    });

    const uid = healthDataToSend.id;
    const apiHealthUrl = import.meta.env.VITE_HEALTH_API_URL;

    try {
      if (valid) {
        await axios.put(`${url}updateItem?id=${uid}`, productDataToSend);
      }
      await axios.put(`${apiHealthUrl}updateItem?id=${uid}`, healthDataToSend);
      alert(`${healthDataToSend?.first_name} actualizado con éxito`);
    } catch (error) {
      alert("Error al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userHealthData?.map((d) => {
      setFormHealthValues(d);
    });
  }, [userHealthData]);

  useEffect(() => {
    if (valid) {
      productData?.map((e) => {
        setMappedProductData(e);
      });
    }
  }, [productData, userHealthData]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ m: "3em", mt: 1 }}
    >
      <Grid container spacing={2}>
        {/* Datos Personales */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <Typography variant="h6">Datos Personales</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="first_name"
                  label="Name"
                  value={formHealthValues.first_name || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  value={formHealthValues.last_name || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="gender"
                  label="Gender"
                  value={formHealthValues.gender || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="date_of_birth"
                  type="number"
                  placeholder="YYYY"
                  leng
                  label="Age of Birth"
                  value={formHealthValues.date_of_birth || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="country"
                  label="Country"
                  value={formHealthValues.country || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="language"
                  label="Language"
                  value={formHealthValues.language || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  value={formHealthValues.email || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phone_number"
                  label="Phone Number"
                  value={formHealthValues.phone_number || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name="status"
                  label="Status"
                  value={formHealthValues.status || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="INACTIVE">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name="informed_consent"
                  label="Informed Consent"
                  value={formHealthValues.informed_consent || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="YES">Yes</MenuItem>
                  <MenuItem value="NO">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name=""
                  label="Informed Consent"
                  value={formHealthValues.informed_consent || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="YES">Yes</MenuItem>
                  <MenuItem value="NO">No</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Información de Cuenta */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <Typography variant="h6">Información de Cuenta</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="uid"
                  label="UID"
                  value={formHealthValues.uid || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  disabled={!valid}
                  name="state"
                  label="State"
                  value={mappedProductData.state || ""}
                  onChange={handleProductChange}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="UNSTARTED">UNSTARTED</MenuItem>
                  <MenuItem value="STARTED">STARTED</MenuItem>
                  <MenuItem value="DESERTION">DESERTION</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="user_type"
                  label="User Type"
                  value={formHealthValues.user_type || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="group"
                  label="Group"
                  value={formHealthValues.group || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="subgroup"
                  label="Sub-Group"
                  value={formHealthValues.subgroup || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="subgroup"
                  label="Sub-Group"
                  value={formHealthValues.subgroup || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name="licenseStatus"
                  label="License Status"
                  value={formHealthValues.licenseStatus || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="valid">Valid</MenuItem>
                  <MenuItem value="invalid">Invalid</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name="dependent"
                  label="Dependent"
                  value={formHealthValues.dependent || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="0">False</MenuItem>
                  <MenuItem value="1">True</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="rid_enrollment"
                  label="Rid Enrollment"
                  value={formHealthValues.rid_enrollment || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="product_enrolled"
                  label="Product enrollment"
                  value={formHealthValues.product_enrolled || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="rid_status"
                  label="Rid Status"
                  value={formHealthValues.rid_status || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="rid_shipping_info"
                  label="Rid Shipping Info"
                  value={formHealthValues.rid_shipping_info || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="qty"
                  label="QTY"
                  value={formHealthValues.qty || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name="blackedListed"
                  label="Blacked Listed"
                  value={formHealthValues.blackedListed || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Dirección */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <Typography variant="h6">Dirección</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="address.address1"
                  label="Dirección 1"
                  value={formHealthValues?.address?.address1 || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="address.address2"
                  label="Dirección 2"
                  value={formHealthValues?.address?.address2 || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="address.city"
                  label="Ciudad"
                  value={formHealthValues?.address?.city || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="address.state"
                  label="Estado/Provincia"
                  value={formHealthValues?.address?.state || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="address.zip_code"
                  label="Código Postal"
                  value={formHealthValues?.address?.zip_code || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="address.observation"
                  label="Observaciones de la Dirección"
                  value={formHealthValues?.address?.observation || ""}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {" "}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            type="submit"
            fullWidth
            endIcon={<SendIcon />}
            size="large"
            variant="contained"
            sx={{ mx: "auto", mt: 2, mb: 2 }}
          >
            Update
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserForm;
