import {Link} from '@tanstack/react-router';
import {Button, Flex, Space, Table, Tag, Tooltip, Typography} from 'antd';
import type {ColumnsType, TableProps} from 'antd/es/table';
import type {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/es/table/interface';
import {find} from 'lodash';
import {map, pipe, uniqBy} from 'lodash/fp';
import React, {Fragment, useState} from 'react';

import {DeleteCustomerPopconfirm} from '@/app/customer';
import * as testIds from '@/lib/cypress/testIds';
import type {Customer} from '@/lib/data-provider/services/api/__generated';
import {useLogoutMutation} from '@/lib/data-provider/services/api/api';
import {getTestAttributes} from '@/utils/test/get-test-attributes';

const expandableContent = {
  expandedRowRender: (record: Customer) => (
    <Typography>{record.about}</Typography>
  ),
};

const createIndustryFiltersMap = pipe(
  map((customer: Customer) => ({
    text: customer.industry,
    value: customer.industry,
  })),
  uniqBy('text'),
);

const renderAction = (customer: Customer) => (
  <Space size='middle'>
    <Link
      to='/customers/$customerId'
      params={{customerId: customer.id!}}
      {...getTestAttributes(testIds.viewCustomer.cta(customer.id!))}
    >
      <Space>
        <Typography>View</Typography>
      </Space>
    </Link>

    <DeleteCustomerPopconfirm customerIds={[customer.id!]}>
      <Button
        type='primary'
        danger
        {...getTestAttributes(testIds.deleteCustomer.cta(customer.id!))}
      >
        Delete
      </Button>
    </DeleteCustomerPopconfirm>

    <Link
      to='/customers/$customerId/update'
      params={{customerId: customer.id!}}
    >
      <Button type='default'>Edit</Button>
    </Link>
  </Space>
);

type Customers = Customer[];
const createColumns = (data: Customers): ColumnsType<Customer> => [
  {
    title: 'Company',
    dataIndex: 'company',
    showSorterTooltip: true,
    sorter: (a, b) => {
      if (a.company! < b.company!) {
        return -1;
      }

      if (a.company! > b.company!) {
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
    title: 'State',
    dataIndex: 'isActive',
    width: 100,
    responsive: ['md'],
    render: isActive => {
      return isActive ? (
        <Tag color='success'>Active</Tag>
      ) : (
        <Tag color='error'>Inactive</Tag>
      );
    },
  },
  {
    title: 'Industry',
    dataIndex: 'industry',
    filters: createIndustryFiltersMap(data),
    onFilter: (value, record) => record.industry!.startsWith(value as string),
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

interface CustomersProps {
  isLoading: boolean;
  data?: Customers;
}

export const Customers: React.FC<CustomersProps> = ({isLoading, ...props}) => {
  const data = (props as unknown as {data?: Customers}).data?.map(customer => ({
    ...customer,
    key: customer.id,
  }));
  const tableColumns = createColumns(data as Customers);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [logout] = useLogoutMutation();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const clearRowSelection = (): void => setSelectedRowKeys([]);

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
            const customer = find(data, {id}) as Customer;

            if (customer.isActive) return false;
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
      console.log({pagination, filters, sorter, extra});
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
        <Link
          to='/customers/create'
          {...getTestAttributes(testIds.createOrUpdateCustomer.cta)}
        >
          <Button type='primary'>New Customer</Button>
        </Link>

        {Boolean(selectedRowKeys.length) && (
          <DeleteCustomerPopconfirm
            customerIds={selectedRowKeys as string[]}
            onConfirm={clearRowSelection}
          >
            <Button type='primary' danger>
              Delete selected customer(s)
            </Button>
          </DeleteCustomerPopconfirm>
        )}
      </Space>
    ),
  };
  return (
    <Fragment>
      <Flex
        align='center'
        justify='space-between'
        style={{padding: '20px 20px 10px 20px'}}
      >
        <Typography.Title
          level={4}
          style={{margin: 0}}
          {...getTestAttributes(testIds.viewCustomer.list.title)}
        >
          Customers list
        </Typography.Title>

        <Button danger type='dashed' onClick={() => logout()}>
          Logout
        </Button>
      </Flex>

      <div style={{overflow: 'scroll'}}>
        <Table {...tableProps} columns={tableColumns} dataSource={data} />
      </div>
    </Fragment>
  );
};
