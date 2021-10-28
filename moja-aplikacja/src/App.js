import React, { useState, useEffect } from 'react';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Weather_data from './weather_data';



const App = () => {
  const [variable, setVariable] = useState('left');
  const [type, setType] = useState('left');
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(Weather_data.period_variables[0]);
  const [inputValue, setInputValue] = useState('');

  // useEffect(() => {
  //   document.title = `Naciśnięto ${count_1} oraz ${count_2} razy`;
  // });
          /// Czy mogę te useEffecty połączyć w jeden dla czystości kody?

  useEffect(() => {
    const url = "http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/pr/1920/1939/ITA"
    const fetchData = async () => {
      try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          setItems(json);
      } catch (error) {
          console.log("error", error);
      }
    };
  
    fetchData();
  },
  []);

  const handleVariable = (event, newVariable) => {
    if (newVariable !== null) {
      setVariable(newVariable);
    }
  };

  const handleType = (event, newType) => {
    if (newType !== null) {
      setType(newType);
    }
  };

  const countryToFlag = (isoCode) => {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }
  

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      justifyContent: "center",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  }));

 {
  const classes = useStyles();
  
    return (
      <div className={classes.root}>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Climate
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <ToggleButtonGroup
            value={variable}
            exclusive
            onChange={handleVariable}
            aria-label="text variable"
          >
            <ToggleButton value="per" aria-label="1">
                Precipitation
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="tas" aria-label="right aligned">
                Temperature
              <FormatAlignRightIcon />
            </ToggleButton>
          </ToggleButtonGroup>  
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="country-select-demo"
            style={{ width: 300 }}
            options={Weather_data.countries}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
              <React.Fragment>
                <span>{countryToFlag(option.code)}</span>
                {option.label} ({option.code}) +{option.phone}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />        
        </Grid>
        <Grid item xs={6}>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handleType}
            aria-label="text type"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <FormatAlignRightIcon />
            </ToggleButton>
          </ToggleButtonGroup>  
        </Grid>
        <Grid item xs={6}>
          <div>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={Weather_data.period_variables}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
            />
          </div>
        </Grid>
      </Grid>
    </div>
    );
  };
}

export default App;