import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "../utils/data";
import { updateUrlParams } from "./update_Url"; // Assuming this handles URL update properly
import { fetchCompanies } from "../service/companies";

export interface Company {
  name: string;
  logo: string;
  domain: string;
}

const CompanyAutocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const debouncedFetchCompanies = useCallback(
    debounce((value: string) => {
      fetchCompanies(value).then((data: any) => {
        setResults(data);
      });

      updateUrlParams(value);
    }, 300),
    []
  );

  useEffect(() => {
    if (window) {
      const href = window.location.href;
      const url = new URL(href);
      const searchParams = Array.from(url.searchParams);
      const searchQ = searchParams.find((e) => e[0] === "search");

      if (searchQ) {
        setQuery(searchQ[1]);
      }
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setQuery(company.name);
  };

  useEffect(() => {
    debouncedFetchCompanies(query);
    updateUrlParams(query);
  }, [query]);

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
              onClick={() => handleCompanySelect(company)}
              className={`items_display ${
                selectedCompany === company ? "selected" : ""
              }`}
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
