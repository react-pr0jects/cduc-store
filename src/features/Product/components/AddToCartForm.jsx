import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import QuantityField from '../../../components/form-controls/QuantityField';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
    root: {
    },
    
    button: {
        width: '250px',
        backgroundColor: '#FE6B8B',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#FF8E53'
        }
    },
}));

function AddToCartForm({ onSubmit = null }) {
    const classes = useStyles();
    const schema = yup.object({
        quantity: yup
            .number()
            .required('Nhập số lượng sản phẩm')
            .min(1, 'Tối thiểu 1 sản phẩm')
            .integer('Số lượng phải là số hợp lệ')
            .typeError('Vui lòng nhập kí tự số'),
    }).required();

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = async (values) => {
        // console.log('Todo Form: ', values);
        if (onSubmit) {
            await onSubmit(values);
        }

        //Reset form sau khi nhập xong
        // form.reset()
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name='quantity' label='Quantity' form={form}/>
                
            <Button type="submit" variant="contained" size="large" className={classes.button}>Thêm vào giỏ hàng</Button>
        </form>
    );
}

export default AddToCartForm;