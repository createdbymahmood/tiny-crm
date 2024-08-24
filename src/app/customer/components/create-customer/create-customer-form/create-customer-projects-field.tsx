import {ISO_8601_DATE_FORMAT} from '@configs/constants';
import type {DatePickerProps, FormInstance} from 'antd';
import {Button, DatePicker, Form, Input} from 'antd';
import type {RuleObject} from 'antd/es/form';
import type {NamePath} from 'antd/es/form/interface';
import type {Dayjs} from 'dayjs';
import dayJS from 'dayjs';
import * as React from 'react';

import {useUpdate} from '@/hooks';
import * as testIds from '@/lib/cypress/testIds';
import {getTestAttributes} from '@/utils/test/get-test-attributes';

import type {CreateCustomerFormPayload} from './create-customer-form.types';

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

/**
 *
 * @param startDateFieldPath path of start_date field array
 * @param form Form instance
 * @returns checks whether end date is after start date
 */
const endDateValidator =
    (startDateFieldPath: NamePath, form: FormInstance) =>
    async (_: RuleObject, value?: Dayjs): Promise<undefined> => {
        if (!value) return;

        const startDate: Dayjs | undefined =
            form.getFieldValue(startDateFieldPath);

        if (startDate?.isAfter(value)) {
            return Promise.reject(
                new Error('End date must be after start date'),
            );
        }
    };

const projectsValidator = async (_, names?: string[]) => {
    if (!names || names.length < 1) {
        return Promise.reject(new Error('At least 1 project'));
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
    (fields, {add, remove}, {errors}) => {
        return (
            <React.Fragment>
                {fields.map(field => {
                    const getFieldName = (path: string) => [field.name, path];

                    const startDateFieldPath = [
                        'projects',
                        field.name,
                        'start_date',
                    ];

                    return (
                        <Form.Item key={field.key} required={false}>
                            <Form.Item
                                label='Project name'
                                name={getFieldName('name')}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input project name',
                                    },
                                ]}
                            >
                                <Input
                                    {...getTestAttributes(
                                        testIds.createOrUpdateCustomer.form
                                            .elements.projects.name,
                                    )}
                                />
                            </Form.Item>

                            <Form.Item
                                label='Contact'
                                name={getFieldName('contact')}
                            >
                                <Input
                                    {...getTestAttributes(
                                        testIds.createOrUpdateCustomer.form
                                            .elements.projects.contact,
                                    )}
                                />
                            </Form.Item>

                            <Form.Item
                                label='Start Date'
                                name={getFieldName('start_date')}
                            >
                                <DatePicker
                                    disabledDate={getIsStartDateValid}
                                    format={ISO_8601_DATE_FORMAT}
                                    style={{width: '100%'}}
                                />
                            </Form.Item>

                            <Form.Item
                                label='End Date'
                                name={getFieldName('end_date')}
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
                                    disabledDate={getIsEndDateValid(
                                        form.getFieldValue(startDateFieldPath),
                                    )}
                                    format={ISO_8601_DATE_FORMAT}
                                    style={{width: '100%'}}
                                    onOpenChange={update}
                                />
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

                <Form.Item>
                    <Button type='dashed' onClick={() => add()}>
                        Add Project
                    </Button>

                    <Form.ErrorList errors={errors} />
                </Form.Item>
            </React.Fragment>
        );
    };

export const CreateCustomerProjectsField: React.FC = () => {
    const form = Form.useFormInstance<CreateCustomerFormPayload>();
    const update = useUpdate();
    return (
        <Form.List name='projects' rules={[{validator: projectsValidator}]}>
            {renderFormList({form, update})}
        </Form.List>
    );
};
