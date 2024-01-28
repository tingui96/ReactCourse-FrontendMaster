import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
    const results = useQuery({ queryKey : animal, queryFn : fetchBreedList });

    return [results?.data?.breeds ?? [], results.status];
}