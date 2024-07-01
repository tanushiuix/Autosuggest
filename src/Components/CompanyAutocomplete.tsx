import React, { useState, useCallback } from "react";
import { debounce } from "./Debounce";
import { fetchCompanies } from "./FetchApi";
export interface Company {
  name: string;
  logo: string;
}

const CompanyAutocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Company[]>([]);

  const debouncedFetchCompanies = useCallback(debounce((value:string)=> {
    fetchCompanies(value,setResults)
  }, 300), []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedFetchCompanies(value);
  };

  const handleSelect = (selectedCompany: Company) => {
    console.log("Selected company:", selectedCompany);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a company..."
      />
      {results.length > 0 && (
        <div className="autocomplete-results">
          {results.map((company, index) => (
            <div
              key={index}
              onClick={() => handleSelect(company)}
              className="items_display"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="company-logo"
              />
              <h5 className="company_name">{company.name}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyAutocomplete;