import { useQuery } from '@tanstack/react-query';

import { endpoints } from '../../../constants/endpoints';
import { queryKey } from '../../../constants/queryKeys';
import { useFetch } from '../../../hooks/api/useFetch';

export type FareCategorySubCategory = {
  brandCode: string;
  order: number;
  status: string;
  price: {
    amount: number;
    currency: string;
  };
  rights: string[];
};

export interface Flight {
  id: string;
  flightDuration: string;
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  originAirport: {
    name: string;
    code: string;
    city: {
      code: string;
      name: string;
    };
    country: {
      code: string;
      name: string;
    };
  };
  destinationAirport: {
    name: string;
    code: string;
    city: {
      code: string;
      name: string;
    };
    country: {
      code: string;
      name: string;
    };
  };
  fareCategories: {
    BUSINESS: { subcategories: FareCategorySubCategory[] };
    ECONOMY: { subcategories: FareCategorySubCategory[] };
  };
}

export const useGetFlights = () => {
  const { customFetch } = useFetch();

  const flights = useQuery({
    queryFn: async () => {
      const result = await customFetch<Flight[]>({
        method: 'GET',
        url: endpoints.flights,
      });

      return result;
    },

    queryKey: [queryKey.flights],
  });

  return { flights };
};
