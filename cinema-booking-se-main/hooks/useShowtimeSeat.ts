import useSWR from 'swr';
import fetcher from '@/lib/fetcher';


const useShowtimeSeat = (showtimeId) => {
    const { data, error, isLoading } = useSWR(`/api/showtimes/showtime?showtimeId=${showtimeId}`, fetcher, {
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

export default useShowtimeSeat;