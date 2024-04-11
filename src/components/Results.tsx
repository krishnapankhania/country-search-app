import React from "react";
import { useStateContext } from "../state";

interface ResultsProps {
  currentPage: number;
  recordsPerPage: number;
}

const Results: React.FC<ResultsProps> = ({ currentPage, recordsPerPage }) => {
  const { countries } = useStateContext();

  // Calculate index of the first and last record on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Get current countries for the current page
  const currentCountries = countries.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <div className="container">
      <table className="table">
        <tbody>
          <tr>
            <th>Country Name</th>
            <th>Capital</th>
            <th>Population</th>
            <th>Languages</th>
            <th>Region</th>
            <th>Subregion</th>
          </tr>
          {currentCountries.length === 0 && (
            <tr>
              <td colSpan={6} className="no-results" align="center">
                {" "}
                No results
              </td>
            </tr>
          )}
          {currentCountries.map((country) => (
            <tr key={country.cca2}>
              <td>{country.name.common}</td>
              <td>{country.capital}</td>
              <td>{country.population}</td>
              <td>
                {Object.values(country.languages)
                  .map((lang: any) => lang)
                  .join(", ")}
              </td>
              <td>{country.region}</td>
              <td>{country.subregion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
