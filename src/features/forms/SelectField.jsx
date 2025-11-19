import { Form, Select } from 'antd';
import { ChevronDownIcon } from '@heroicons/react/16/solid'

const { Option } = Select;

const SelectField = ({ name, label, value, rules, getSubText, onChange, options, placeholder, loading, disabled }) => {

  return (
    <Form.Item 
      label={label} 
      name={name}
      initialValue={value}
      rules={rules}
    >
      <Select 
        placeholder={placeholder}
        suffixIcon={<ChevronDownIcon />}
        loading={loading}
        onChange={onChange}
        optionLabelProp="label"
        disabled={disabled}
      >
        {options.map(option => (
          <Option key={option.id} value={option.id} label={option.name}>
            {option.name}
            {getSubText && (
              <span style={{ marginLeft: '0.5rem', fontWeight: 300 }}>getSubText(option)</span>
            )}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectField;
