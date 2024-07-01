import { Company } from "./CompanyAutocomplete";

export const fetchCompanies = async (value: string, callback: (results: Company[])=> void) => {
    try {
      const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
      callback(data)
      
    } catch (error) {
      console.error("Error fetching companies:", error);
     return  error;
    }
  };