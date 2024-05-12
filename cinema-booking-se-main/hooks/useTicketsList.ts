import useSWR from 'swr';
import fetcher from '@/lib/fetcher';


const useTicketsList = (id?: String) => {
  const { data, error, isLoading } = useSWR(id ? `/api/tickets/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading
  }
};

export default useTicketsList;