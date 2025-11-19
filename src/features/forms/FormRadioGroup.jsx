// import React, { useEffect } from 'react';
import { Form, Radio } from 'antd';

const FormRadioGroup = ({ name, btns, onChange }) => {

  return (
    <Form.Item name={name}>
      <Radio.Group buttonStyle="solid" onChange={onChange}>
        {btns.map(btn => (
          <Radio.Button key={btn.value} value={btn.value}>
            {btn.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default FormRadioGroup;
