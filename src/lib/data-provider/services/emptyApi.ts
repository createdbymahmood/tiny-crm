// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {findIndex, includes, remove} from 'lodash';

import {generatedApi} from '@/lib/data-provider/services/__generated';
import {providesList} from '@/utils/redux';

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: '/'}),
    endpoints: () => ({}),
});
