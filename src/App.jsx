import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import { useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
        },
    },
});

const App = () => {
    const adoptedPet = useState(null);
    return (
        <div>
            <BrowserRouter>
                <AdoptedPetContext.Provider value={adoptedPet}>
                    <QueryClientProvider client={queryClient}>
                        <header>
                            <Link to="/">Adopt Me!</Link>
                        </header>
                        <Routes>
                            <Route path="/details/:id" element={<Details />} />
                            <Route path="/" element={<SearchParams />} />
                        </Routes>
                    </QueryClientProvider>
                </AdoptedPetContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);