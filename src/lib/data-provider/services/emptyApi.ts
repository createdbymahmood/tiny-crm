// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { generatedApi } from '@/lib/data-provider/services/__generated';
import { providesList } from '@/utils/redux';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: () => ({}),
});

export const api = generatedApi.enhanceEndpoints({
    endpoints: {
        updatePet(endpoint) {
            endpoint.invalidatesTags = pet => [{ type: 'store', id: pet?.id }];
        },

        findPetsByTags(endpoint) {
            endpoint.providesTags = result => {
                return providesList(result, 'pet');
            };
        },
    },
});
