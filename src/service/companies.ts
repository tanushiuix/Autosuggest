export const fetchCompanies = async (value: string) => {
  try {
    if (!value.trim()) {
      return [];
    }

    const response = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return error;
  }
};
