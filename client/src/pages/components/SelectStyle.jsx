const SelectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: 'transparent',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'transparent',
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a7b0b5' : state.isFocused ? '#a7b0b5' : null,
    }),
    activeOption: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#a7b0b5' : state.isFocused ? '#a7b0b5' : null,
    }),
  };
  
  export default SelectStyles;