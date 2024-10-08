import {useParams} from '@tanstack/react-router';
import * as React from 'react';
import {Helmet} from 'react-helmet-async';

import {ViewCustomerModal} from '@/app/customer';
import {useModalRouteState} from '@/hooks';

export const ViewCustomer: React.FC = () => {
  const {modal} = useModalRouteState();
  const customerId = useParams({strict: false, select: s => s.customerId!});

  return (
    <React.Fragment>
      <Helmet title='View Customer' />
      <ViewCustomerModal
        customerId={customerId}
        open={modal.isOpen}
        onCancel={modal.onCancel}
      />
    </React.Fragment>
  );
};
