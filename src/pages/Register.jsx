import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import validators from '../utils/validators';
import { Button, TextField, CircularProgress, Typography } from '@material-ui/core';
import PageContainer from '../components/PageContainer';
import Modal from '../components/Modal';
import { makeStyles } from '@material-ui/core/styles';
import palette from '../utils/palette';

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderColor: palette.border,
        backgroundColor: 'white',
        marginTop: '2.5em',
        marginBottom: '2em',
        boxSizing: 'border-box',
        [theme.breakpoints.between('xs', 'sm')]: {
            padding: '0em',
            width: '90%',
            borderStyle: 'none',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            padding: '1em',
            width: '60%'
        },
        [theme.breakpoints.between('md', 'lg')]: {
            padding: '2em',
            width: '45%'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '3em',
            width: '35%'
        },
    },
    input: {
        margin: '1em',
        width: '100%'
    },
    button: {
        marginTop: '1em'
    },
    modalContent: {
        boxSizing: 'border-box',
        padding: '2.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
}))

function Register() {
    const [loading, setLoading] = useState(true);
    const [succefullyRegister, setSuccefullyRegister] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const classes = useStyle();
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            console.log(values)
        },
        validate: values => {
            let errors = {};
            if (values.username.length < 4) errors.username = "Nombre de usuario muy corto";
            if (values.username.length > 15) errors.username = "Nombre de usuario muy largo";
            if (values.username.length === 0) errors.username = "Debe completar este campo";
            if (!validators.validateEmail(values.email)) errors.email = "Formato de correo electrónico no válido";
            if (values.password.length < 6) errors.password = "Password muy corto";
            if (values.password.length > 20) errors.password = "Password muy largo";
            if (values.password.length === 0) errors.password = "Debe completar este campo";
            return errors;
        },
        validateOnChange: false,
        validateOnBlur: false,
    })

    return (
        <PageContainer align="center" backgroundColor={palette.background}>
            <form className={classes.root} onSubmit={formik.handleSubmit}>
                <Typography variant="h4">Registrarse</Typography>
                <TextField
                    id="username"
                    name="username"
                    label="Nombre de usuario"
                    variant="outlined"
                    value={formik.values.username}
                    className={classes.input}
                    helperText={formik.errors.username}
                    error={formik.errors.username}
                    onChange={formik.handleChange}
                    InputProps={{ inputProps: { maxLength: 20 } }}
                />
                <TextField
                    id="email"
                    name="email"
                    label="Correo electrónico"
                    variant="outlined"
                    type="email"
                    value={formik.values.email}
                    className={classes.input}
                    helperText={formik.errors.email}
                    error={formik.errors.email}
                    onChange={formik.handleChange}
                    InputProps={{ inputProps: { maxLength: 50 } }}
                />
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    value={formik.values.password}
                    className={classes.input}
                    helperText={formik.errors.password}
                    error={formik.errors.password}
                    onChange={formik.handleChange}
                    InputProps={{ inputProps: { maxLength: 20 } }}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    type="submit"
                    disabled={loading}
                >
                    ACEPTAR
                </Button>
                { loading ? <CircularProgress style={{margin: '1em'}}/> : ''}
            </form>
            <Modal open={modalOpen}>
                <div className={classes.modalContent}>
                    <Typography variant="h5" style={{color: palette.secondary}}>Se ha procesado el registro exitosamente</Typography>
                    <p>Se ha envíado un email a su cuenta de correo <em>{formik.values.email}</em> para confirmar su registro
                    <br/>En caso de no encontrarlo revise la sección de spam
                    </p>
                    <Button variant="contained" color="primary" onClick={() => setModalOpen(false)}>Aceptar</Button>
                </div>
            </Modal>
        </PageContainer>
    )
}

export default Register;