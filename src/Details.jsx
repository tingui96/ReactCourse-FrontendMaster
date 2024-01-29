import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useContext, useState, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdoptedPetContext from "./AdoptedPetContext";

const Modal = lazy(() => import("./Modal"));

const Details = () => {
    const { id } = useParams();
    const results = useQuery({ queryKey: id, queryFn: fetchPet });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [, setAdoptedPet] = useContext(AdoptedPetContext);
    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🌀</h2>
            </div>
        );
    }
    const pet = results.data?.pets[0];
    return (
        <div className="details">
            <div>
                <Carousel images={pet.images} />;
                <h1>{pet?.name}</h1>
                <h2>{`${pet?.animal} — ${pet?.breed} — ${pet?.city}, ${pet?.state}`}</h2>
                <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>;
                <p>{pet.description}</p>
                {
                    showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {pet.name}?</h1>
                                <div className="buttons">
                                    <button onClick={() => {setAdoptedPet(pet); navigate("/"); }} >
                                        Yes
                                    </button>;
                                    <button onClick={() => setShowModal(false)}>No</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null
}
            </div>
        </div>
    );
};

export default function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    );
}