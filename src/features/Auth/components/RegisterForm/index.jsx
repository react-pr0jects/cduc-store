import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Avatar, Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from '../../../../components/form-controls/PasswordField';


RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: theme.spacing(4, 0),
        width: '500px'
    },

    avatar: {
        margin: 'auto',
        backgroundColor: theme.palette.secondary.main,
    },

    title: {
        textAlign: 'center',
        marginTop: '5px',
    },

    submit: {
        backgroundColor: '#FE6B8B',
        color: '#fff',
        padding: '10px',
        marginTop: '10px',
    },
    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
        right: theme.spacing(1),
    }
}))

function RegisterForm(props) {

    const classes = useStyles()

    const schema = yup.object({
        fullName: yup.string().required('Họ tên không được để trống')
            .test('Họ tên nên có ít nhất 2 từ', 'Vui lòng nhập ít nhất 2 từ', value => {
                return value.split(' ').length >= 2
            }),
        email: yup.string().required('Email không được để trống').email('Vui lòng nhập email hợp lệ'),
        password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu tối thiểu là 6 kí tự'),
        retypepassword: yup.string().required('Nhập lại mật khẩu').oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    }).required();

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypepassword: '',
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = async (values) => {
        // console.log('Todo Form: ', values);
        const { onSubmit }  = props;
        if (onSubmit) {
            await onSubmit(values);
        }

        //Reset form sau khi nhập xong
        // form.reset()
    }

    const { isSubmitting } = form.formState

    return (
        <div className={classes.root}>
            { isSubmitting && <CircularProgress className={classes.progress}/> }
            
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography className={classes.title} component="h3" variant="h5">
                TẠO TÀI KHOẢN
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name='fullName' label='Họ & Tên' form={form}/>
                <InputField name='email' label='Email' form={form}/>
                <PasswordField name='password' label='Mật Khẩu' form={form}/>
                <PasswordField name='retypepassword' label='Nhập lại mật khẩu' form={form}/>
                
                <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" fullWidth>Đăng Kí</Button>
            </form>
        </div>
    );
}

export default RegisterForm;