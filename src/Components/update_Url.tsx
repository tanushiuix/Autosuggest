export const updateUrlParams = (value: string) => {
    const params = new URLSearchParams(window.location.search);
  
    if (value.trim() !== "") {
      params.set("search", value);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
  
      window.history.replaceState({}, "", newUrl);
  
      return;
    } else {
      params.delete("search");
    }
  };
  