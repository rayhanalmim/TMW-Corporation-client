import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdminCard = () => {
    const axiosPublic = useAxiosPublic();

    const { data: adminCard = [], isLoading: cardLoading, refetch: cardRefetch} = useQuery({
        queryKey: ["adminCard"],
        queryFn: async () => {
            const res = await axiosPublic.get('/card/getAdminCard');
            return res.data;
        }
    })
    return {adminCard, cardLoading, cardRefetch};
};

export default useAdminCard;