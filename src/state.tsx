import { ReactNode, createContext, useContext, useState } from "react";
import axios from "axios";

export interface Country {
  cca2: string;
  name: { common: string };
  capital: string;
  population: number;
  languages: Record<string, string>;
  region: string;
  subregion: string;
}

interface StateContextType {
  countries: Country[];
  fetchCountries: (query?: string) => Promise<void>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};

const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: any) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const fetchCountries = async (name?: string) => {
    try {
      if (name === "") {
        setCountries([]);
      } else {
        const response = await axios.get(
          "https://restcountries.com/v3.1/name/" + name
        );
        setCountries(response.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  return (
    <StateContext.Provider value={{ countries, fetchCountries }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
