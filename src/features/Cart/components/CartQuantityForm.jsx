import { yupResolver } from '@hookform/resolvers/yup';
import QuantityField from '../../../components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

CartQuantityForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default function CartQuantityForm({ onSubmit = null, value: initialQuantity }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Nhập số lượng sản phẩm')
      .min(1, 'Tối thiểu 1 sản phẩm')
      .integer('Số lượng phải là số hợp lệ')
      .typeError('Vui lòng nhập kí tự số'),
  });

  const form = useForm({
    mode: 'onTouched',
    defaultValues: { quantity: initialQuantity },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const submitCallback = form.handleSubmit(handleFormSubmit);

  return (
    <form onSubmit={submitCallback} onClick={submitCallback}>
      <QuantityField name='quantity' form={form} submitCallback={submitCallback} />
    </form>
  );
}