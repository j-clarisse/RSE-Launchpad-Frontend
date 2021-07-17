/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Container } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import classNames from "classnames";
import { mdiRocket } from '@mdi/js';
import Icon from '@mdi/react'
import { Redirect } from 'react-router-dom';

import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: "white",
      borderBottomColor: "white"
    },
    "& label.MuiInputLabel-root": {
      color: "white",
      borderBottomColor: "white"

    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white"
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiInput-input": {
      color: 'white'
    },
    "& .MuiSvgIcon-root": {
      color:'white'
    }
  },

  placement: {
    display: 'flex',
    height: '100%',
    flexWrap: 'wrap',
  },

  textContainer: {
    width: '40%',
    padding: '10% 0% 0% 5%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },

  },
  heading: {
    /* fontSize: '7vh', */
    fontSize: '4vw',
  },
  searchContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: '15% 0px 100px 60px',
    /* width: '40%' */
    width: '400px'
  },
  searchIcon: {
    color: 'white',
    margin: '20px 10px 0 0',
  },
  searchBtn: {
    margin: '0 0 0 10px',
  },
  disabledSearchBtn: {
    width: 0,
  },
  searchBarArea: {
    width: '320px',
  }, 
  tag: {
    height: 33,
    position: "relative",
    zIndex: 0,
    fontSize: 14,
    backgroundColor: 'white',
    "& .MuiChip-label": {
      color: "#572CBF",
    },
    "& .MuiChip-deleteIcon": {
      color: "#572CBF",
    }
  },
  subtitle: {
    fontSize: '2.5vh',
  },
  label: {
    fontFamily: 'Poppins, sans-serif',
    /* padding: '0 0 10px 0',
    margin: '0 0 100px 0', */
  }

}));

export function Homepage() {
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState([]);
  const history = useHistory();

  // Appends the titles of the searchValues array to query string
  function searchQuery(array) {
    let titles = [];
    array.forEach(value => titles.push(value.title));
    const query = titles.join('&');
    return query;
  }

  // Creates query & redirects to search results
  function handleSearch(event) {
    const query = searchQuery(searchValue)
    console.log(query)
    history.push(`/search/${query}`);
  }

  return (
    <div className={classes.placement}>
      <div className={classes.textContainer}>
        <h1 className={classes.heading}>Make learning easier with launchpad now.</h1>
        <h3 className={classes.subtitle}>
          Find helpful resources, rated by the community.
        </h3>
      </div>
      <div className={classes.searchContainer}>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <SearchIcon className={classes.searchIcon}/>
          {/* <IconButton className={classes.searchIcon} aria-label="menu" disabled>
            <SearchIcon />
          </IconButton> */}
          <div className={classes.searchBarArea}>
            <Autocomplete
              multiple
              id="tags-standard"
              className={classes.root}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                  classes={{
                    root: classNames(classes.tag)
                  }}
                  variant="outlined"
                  label={`${option.title}`}
                  {...getTagProps({ index })}
                  
                  />
                ))
              }
              options={subjectList}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              noOptionsText="Please select one of the dropdown options"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={<div className={classes.label}>Search by subject or resource type</div>}
                />
              )}
              onChange={(event, value) => setSearchValue(value)}
            />
          </div>
          <IconButton 
            className={searchValue.length ? classes.searchBtn : classes.disabledSearchBtn} 
            onClick={handleSearch} 
          >
            <Icon path={mdiRocket}
              size={2}
              rotate={90}
              color="white"/>
          </IconButton>
        </div>
        
      </div>
    </div>
  );
}

const subjectList = [
  { title: 'Accenture'},
  { title: 'Art'},
  { title: 'AWS'},
  { title: 'Books'},
  { title: 'C++'},
  { title: 'Engineering'},
  { title: 'Geography'},
  { title: 'Plants'},
  { title: 'Python'},
  { title: 'React'},
  { title: 'Stoicism'},
  { title: 'Software development'},
];