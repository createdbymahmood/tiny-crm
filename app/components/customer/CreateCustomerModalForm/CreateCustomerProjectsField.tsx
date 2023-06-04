import type { CreateCustomerFormPayload } from '@components/customer/CreateCustomerModalForm/CreateCustomerForm.types';
import { ISO_8601_DATE_FORMAT } from '@configs/constants';
import type { DatePickerProps, FormInstance } from 'antd';
import { Button, DatePicker, Form, Input } from 'antd';
import type { RuleObject } from 'antd/es/form';
import type { NamePath } from 'antd/es/form/interface';
import { useUpdate } from 'app/hooks/useUpdate';
import type { Dayjs } from 'dayjs';
import dayJS from 'dayjs';
import * as React from 'react';

const getIsStartDateValid: DatePickerProps['disabledDate'] = current => {
    // Can not select days before today
    return current <= dayJS().startOf('day');
};

const getIsEndDateValid =
    (startDate?: Dayjs): DatePickerProps['disabledDate'] =>
    current => {
        const isStartOfDay = current <= dayJS().startOf('day');
        if (!startDate) return isStartOfDay;
        return isStartOfDay || startDate.isAfter(current);
    };

const endDateValidator =
    (startDateFieldPath: NamePath, form: FormInstance) =>
    async (_: RuleObject, value?: Dayjs): Promise<undefined> => {
        if (value) {
            const startDate: Dayjs | undefined =
                form.getFieldValue(startDateFieldPath);

            if (startDate?.isAfter(value)) {
                return Promise.reject(
                    new Error('End date must be after start date'),
                );
            }
        }
    };

interface RenderFormListParams {
    form: FormInstance;
    update: () => void;
}

const renderFormList =
    ({
        form,
        update,
    }: RenderFormListParams): React.ComponentProps<
        typeof Form.List
    >['children'] =>
    (fields, { add, remove }, { errors }) => {
        return (
            <React.Fragment>
                {fields.map(field => {
                    const startDateFieldPath = [
                        'projects',
                        field.name,
                        'start_date',
                    ];

                    return (
                        <Form.Item required={false} key={field.key}>
                            <Form.Item
                                {...field}
                                label='Project name'
                                name={[field.name, 'name']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input project name',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                {...field}
                                label='Contact'
                                name={[field.name, 'contact']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input project contact',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name={[field.name, 'start_date']}
                                label='Start Date'
                            >
                                <DatePicker
                                    format={ISO_8601_DATE_FORMAT}
                                    style={{ width: '100%' }}
                                    disabledDate={getIsStartDateValid}
                                />
                            </Form.Item>

                            <Form.Item
                                name={[field.name, 'end_date']}
                                label='End Date'
                                rules={[
                                    {
                                        validator: endDateValidator(
                                            startDateFieldPath,
                                            form,
                                        ),
                                    },
                                ]}
                            >
                                <DatePicker
                                    format={ISO_8601_DATE_FORMAT}
                                    style={{ width: '100%' }}
                                    disabledDate={getIsEndDateValid(
                                        form.getFieldValue(startDateFieldPath),
                                    )}
                                    onOpenChange={update}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type='dashed' onClick={() => add()}>
                                    Add Project
                                </Button>

                                <Form.ErrorList errors={errors} />
                            </Form.Item>

                            {fields.length > 1 ? (
                                <Button
                                    danger
                                    onClick={() => remove(field.name)}
                                >
                                    Delete Project
                                </Button>
                            ) : null}
                        </Form.Item>
                    );
                })}
            </React.Fragment>
        );
    };

export const CreateCustomerProjectsField: React.FC = () => {
    const form = Form.useFormInstance<CreateCustomerFormPayload>();
    const update = useUpdate();
    return (
        <Form.List
            name='projects'
            rules={[
                {
                    validator: async (_, names) => {
                        if (!names || names.length < 1) {
                            return Promise.reject(
                                new Error('At least 1 project'),
                            );
                        }
                    },
                },
            ]}
        >
            {renderFormList({ form, update })}
        </Form.List>
    );
};
