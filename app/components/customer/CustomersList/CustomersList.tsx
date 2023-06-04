import { DeleteCustomerPopconfirm } from '@components/customer';
import type {
    Customer,
    Customers,
} from '@lib/data-provider/services/customer/customer.types';
import { createRoute } from '@routes/createRoute';
import { Button, Space, Table, Tooltip, Typography } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type {
    TablePaginationConfig,
    TableRowSelection,
} from 'antd/es/table/interface';
import { find } from 'lodash';
import { map, pipe, uniqBy } from 'lodash/fp';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const expandableContent = {
    expandedRowRender: (record: Customer) => (
        <Typography>{record.about}</Typography>
    ),
};

interface CustomersListProps {
    isLoading: boolean;
}

const createIndustryFiltersMap = pipe(
    map((customer: Customer) => ({
        text: customer.industry,
        value: customer.industry,
    })),
    uniqBy('text'),
);

const renderAction = (customer: Customer) => (
    <Space size='middle'>
        <Link to={createRoute('customers.view', { id: customer.id })}>
            <Space>
                <Typography>View</Typography>
            </Space>
        </Link>

        <DeleteCustomerPopconfirm customerIds={[customer.id]}>
            <Button type='primary' danger>
                Delete
            </Button>
        </DeleteCustomerPopconfirm>

        <Link to={createRoute('customers.update', { id: customer.id })}>
            <Button type='default'>Edit</Button>
        </Link>
    </Space>
);

const createColumns = (data: Customers): ColumnsType<Customer> => [
    {
        title: 'Company',
        dataIndex: 'company',
        showSorterTooltip: true,
        sorter: (a, b) => {
            if (a.company < b.company) {
                return -1;
            }

            if (a.company > b.company) {
                return 1;
            }

            return 0;
        },
        ellipsis: {
            showTitle: false,
        },
        render: company => (
            <Tooltip placement='topLeft' title={company}>
                {company}
            </Tooltip>
        ),
        width: 200,
    },
    {
        title: 'Industry',
        dataIndex: 'industry',
        filters: createIndustryFiltersMap(data),
        onFilter: (value, record) =>
            record.industry.startsWith(value as string),
        width: 100,
        responsive: ['md'],
    },
    {
        title: 'About',
        dataIndex: 'about',
        ellipsis: true,
        responsive: ['md'],
    },
    {
        title: 'Action',
        key: 'action',
        render: renderAction,
        fixed: 'right',
        width: 230,
    },
];

export const CustomersList: React.FC<CustomersListProps> = ({
    isLoading,
    ...props
}) => {
    const data = (props as unknown as { data?: Customers }).data?.map(
        customer => ({ ...customer, key: customer.id }),
    );
    const tableColumns = createColumns(data!);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<Customer> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_NONE,
            {
                key: 'inactive',
                text: 'Select Inactive Customers',
                onSelect: changeableRowKeys => {
                    // eslint-disable-next-line fp/no-let
                    let newSelectedRowKeys = [] as React.Key[];
                    newSelectedRowKeys = changeableRowKeys.filter(id => {
                        const customer = find(data, { id }) as
                            | Customer
                            | undefined;

                        if (customer?.isActive) return false;
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };
    const tableProps: TableProps<Customer> = {
        size: 'large',
        expandable: expandableContent,
        rowSelection,
        tableLayout: 'fixed',
        loading: isLoading,
        onChange(pagination, filters, sorter, extra) {
            console.log({ pagination, filters, sorter, extra });
        },
        pagination: {
            position: ['bottomRight'] as TablePaginationConfig['position'],
        },

        caption: (
            <Space
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: 20,
                }}
            >
                <Link to={createRoute('customers.create')}>
                    <Button type='primary'>New Customer</Button>
                </Link>

                {Boolean(selectedRowKeys.length) && (
                    <DeleteCustomerPopconfirm
                        customerIds={selectedRowKeys as string[]}
                    >
                        <Button type='primary' danger>
                            Delete selected customer(s)
                        </Button>
                    </DeleteCustomerPopconfirm>
                )}
            </Space>
        ),
    };
    return <Table {...tableProps} columns={tableColumns} dataSource={data} />;
};
