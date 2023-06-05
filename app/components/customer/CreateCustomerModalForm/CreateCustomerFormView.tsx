/**
 *
 *CreateCustomerView
 *
 */
import type { FormCancelHandle } from '@components/customer/CreateCustomerModalForm/CreateCustomerForm.types';
import { CreateCustomerProjectsField } from '@components/customer/CreateCustomerModalForm/CreateCustomerProjectsField';
import * as testIds from '@lib/cypress/testIds';
import { getTestAttributes } from '@utils/test/getTestAttributes';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import * as React from 'react';

interface CreateCustomerFormViewProps {
    isLoading: boolean;
    onCancel: FormCancelHandle;
}

export const CreateCustomerFormView: React.FC<CreateCustomerFormViewProps> = ({
    isLoading,
    onCancel,
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
                <Input
                    {...getTestAttributes(
                        testIds.createOrUpdateCustomer.form.elements.company,
                    )}
                />
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
                <Input
                    {...getTestAttributes(
                        testIds.createOrUpdateCustomer.form.elements.industry,
                    )}
                />
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
                <Input.TextArea
                    rows={5}
                    {...getTestAttributes(
                        testIds.createOrUpdateCustomer.form.elements.about,
                    )}
                />
            </Form.Item>

            <Form.Item name='isActive' valuePropName='checked'>
                <Checkbox>Is Active</Checkbox>
            </Form.Item>

            <CreateCustomerProjectsField />

            <Form.Item
                style={{
                    justifyContent: 'flex-end',
                    display: 'flex',
                }}
            >
                <Space size='middle'>
                    <Button type='default' onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={isLoading}
                        {...getTestAttributes(
                            testIds.createOrUpdateCustomer.form.elements.submit,
                        )}
                    >
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </React.Fragment>
    );
};
