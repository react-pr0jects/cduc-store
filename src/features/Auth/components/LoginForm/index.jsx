import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Avatar, Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from '../../../../components/form-controls/PasswordField';


LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: theme.spacing(4, 0),
        width: '500px'
    },

    avatar: {
        margin: theme.spacing(0, 'auto'),
        // margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },

    title: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
    },

    submit: {
        backgroundColor: '#FE6B8B',
        color: '#fff',
        padding: '10px',
        marginTop: theme.spacing(2),
    },
    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
        right: theme.spacing(1),
    }
}))

function LoginForm(props) {

    const classes = useStyles()

    const schema = yup.object({
        identifier: yup.string().required('Email không được để trống').email('Vui lòng nhập email hợp lệ'),
        password: yup.string().required('Mật khẩu không được để trống')
    }).required();

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
                Đăng Nhập
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name='identifier' label='Email' form={form}/>
                <PasswordField name='password' label='Password' form={form}/>
                
                <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" fullWidth>Đăng Kí</Button>
            </form>
        </div>
    );
}

export default LoginForm;