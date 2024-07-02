import React from 'react';
import CompanyAutocomplete from './Components/company_AutoComplete';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className='heading'>Company Autocomplete Example</h1>
      <CompanyAutocomplete />
    </div>
  );
};

export default App;
