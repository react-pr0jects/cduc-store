import { unwrapResult } from '@reduxjs/toolkit/';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm';
// import RegisterForm from '../RegisterForm';

Login.propTypes = {
    closeDialog: PropTypes.func,
};


function Login(props) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const handleSubmit = async (values) => {
        // console.log('Form Submit: ', values);
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction)

            //Đóng Form Register khi đkí thành công
            const { closeDialog } = props
            if (closeDialog) {
                closeDialog();
            }

            console.log('New User: ', user)
        } catch (error) {
            console.log('Failed to register: ', error);
            enqueueSnackbar(error.message, {variant: 'error'});

        }
    }

    return (
        <div>
            {/* <RegisterForm onSubmit={handleSubmit}/> */}
            <LoginForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Login;