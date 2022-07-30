import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit/';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

Register.propTypes = {
    closeDialog: PropTypes.func,
};


function Register(props) {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const handleSubmit = async (values) => {
        // console.log('Form Submit: ', values);
        try {
            //auto set username = email
            values.username = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction)

            //Đóng Form Register khi đkí thành công
            const { closeDialog } = props
            if (closeDialog) {
                closeDialog();
            }

            console.log('New User: ', user)
            enqueueSnackbar('Register Successfully !!!', {variant: 'success'});
        } catch (error) {
            // console.log('Failed to register: ', error);
            enqueueSnackbar(error.message, {variant: 'error'});

        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;