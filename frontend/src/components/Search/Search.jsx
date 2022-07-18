import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const Search = (props) => {
  const { onSearch, className, placeholder } = props;
  let timeout = null;
  const onSearchAction = (e) => {
    clearTimeout(timeout);
    const value = e.target.value;
    timeout = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  return (
    <>
      <TextField
        onKeyUp={onSearchAction}
        size="small"
        placeholder={placeholder || "Buscar ..."}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
