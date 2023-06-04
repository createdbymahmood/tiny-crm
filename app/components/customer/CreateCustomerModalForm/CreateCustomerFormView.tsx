/**
 *
 *CreateCustomerView
 *
 */
import type { useCreateCustomerMutation } from '@lib/data-provider/services/customer';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import * as React from 'react';

interface CreateCustomerFormViewProps {
    result: ReturnType<typeof useCreateCustomerMutation>['1'];
}

export const CreateCustomerFormView: React.FC<CreateCustomerFormViewProps> = ({
    result,
}) => {
    return (
        <React.Fragment>
            <Form.Item
                label='Company'
                name='company'
                rules={[
                    {
                        required: true,
                        message: 'Please input the company name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Industry'
                name='industry'
                rules={[
                    {
                        required: true,
                        message: 'Please input company industry',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='About'
                name='about'
                rules={[
                    {
                        required: true,
                        message: 'Please write something about customer',
                    },
                ]}
            >
                <Input.TextArea rows={5} />
            </Form.Item>

            <Form.Item name='isActive' valuePropName='checked'>
                <Checkbox>Is Active</Checkbox>
            </Form.Item>

            <Form.Item
                style={{
                    justifyContent: 'flex-end',
                    display: 'flex',
                }}
            >
                <Space size='middle'>
                    <Button type='default' htmlType='reset'>
                        Cancel
                    </Button>

                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </React.Fragment>
    );
};
