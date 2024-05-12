import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useAddMovie = () => {
	const { data, error, isLoading, mutate } = useSWR('/api/insertMovie', fetcher);

	return {
		data,
		error,
		isLoading,
		mutate
	}
}

export default useAddMovie