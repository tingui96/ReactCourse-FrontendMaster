import useBreedList from "./useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import { useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
    });

    const results = useQuery({ queryKey : requestParams, queryFn : fetchSearch });
    const pets = results?.data?.pets ?? [];
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    const [adoptedPet] = useContext(AdoptedPetContext);

    return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? "",
                };
                setRequestParams(obj);
            }} >
                
                <label htmlFor="location">
                    <label htmlFor="animal">
                        Animal
                        <select id="animal" name="animal" onChange={(e) => {setAnimal(e.target.value); }} onBlur={(e) => {setAnimal(e.target.value);}} >
                            <option />
                            {ANIMALS.map((animal) => (
                                <option key={animal} value={animal}>
                                    {animal}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="breed">
                        Breed
                        <select disabled={!breeds.length} id="breed" name="breed">
                            <option />
                            {breeds.map((breed) => (
                                <option key={breed} value={breed}>
                                    {breed}
                                </option>
                            ))}
                        </select>
                    </label>
                    Location
                    <input id="location" name="location" placeholder="Location" />
                </label>
                <button>Submit</button>
                {
                    adoptedPet ? (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ) : null // you have to remove this semi-colon, my auto-formatter adds it back if I delete it
                }
            </form>
            <Results pets={pets} />;
        </div>
    );
};

export default SearchParams;