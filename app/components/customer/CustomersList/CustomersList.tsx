import { DeleteCustomerPopconfirm } from '@components/customer';
import type {
    Customer,
    Customers,
} from '@lib/data-provider/services/customer/customer.types';
import { createRoute } from '@routes/createRoute';
import { Button, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { map, pipe, uniqBy } from 'lodash/fp';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type TablePaginationPosition =
    | 'bottomCenter'
    | 'bottomLeft'
    | 'bottomRight'
    | 'topCenter'
    | 'topLeft'
    | 'topRight';

const expandableContent = {
    expandedRowRender: (record: Customer) => <p>{record.about}</p>,
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
            <Space>View</Space>
        </Link>

        <DeleteCustomerPopconfirm customerId={customer.id}>
            <Button type='primary' danger>
                Delete
            </Button>
        </DeleteCustomerPopconfirm>
    </Space>
);

const createColumns = (data: Customers): ColumnsType<Customer> => [
    {
        title: 'Company',
        dataIndex: 'company',
        responsive: ['md'],
        sorter: (a, b) => {
            if (a.company < b.company) {
                return -1;
            }

            if (a.company > b.company) {
                return 1;
            }

            return 0;
        },
    },
    {
        title: 'Industry',
        dataIndex: 'industry',
        filters: createIndustryFiltersMap(data),
        onFilter: (value, record) =>
            record.industry.startsWith(value as string),
    },
    {
        title: 'About',
        dataIndex: 'about',
        ellipsis: true,
    },
    {
        title: 'Action',
        key: 'action',
        render: renderAction,
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
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: changeableRowKeys => {
                    // eslint-disable-next-line fp/no-let
                    let newSelectedRowKeys = [] as React.Key[];
                    newSelectedRowKeys = changeableRowKeys.filter(
                        (_, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }

                            return true;
                        },
                    );
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: changeableRowKeys => {
                    // eslint-disable-next-line fp/no-let
                    let newSelectedRowKeys = [] as React.Key[];
                    newSelectedRowKeys = changeableRowKeys.filter(
                        (_, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }

                            return false;
                        },
                    );
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
    };
    return (
        <Table
            {...tableProps}
            pagination={{
                position: ['bottomRight'] as TablePaginationPosition[],
            }}
            columns={tableColumns}
            dataSource={data}
        />
    );
};
