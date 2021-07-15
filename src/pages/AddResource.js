import React, { useEffect, useState }from 'react';
import { Container, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { StyledText, StyledInput, PrimaryButton } from '../styles/Styled';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { InputLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import MenuItem from "@material-ui/core/MenuItem";
import { Typography, Slider, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  placement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '75vh',
  },
  container: {
    /* textAlign: 'center', */
    width: '50%',
    padding: '0 90px',
  },
  heading: {
    fontSize: '3rem'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1),
    minWidth: 120
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} min={0} max={10}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const marks = [
  {
    value: 0,
  },
  {
    value: 5,
  },
  {
    value: 10,
  }
];

export function AddResource() {
  const classes = useStyles();
  const [resourceName, setResourceName] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [userResourceType, setUserResourceType] = useState("");
  const [resourceReview, setResourceReview] = useState("");
  const [rating, setRating] = useState({
                                        "overall": "",
                                        "understanding": "", 
                                        "difficulty": "", 
                                        "reliability": "" })

  useEffect(() => {
    console.log(rating)
  }, [rating])

  // define the callAPI function that takes a first name and last name as parameters
  async function handleSubmit (event) {
    event.preventDefault();
    console.log("hello");
    if (resourceType === "Other" && userResourceType !== "") {
      setResourceType(userResourceType)
    }

    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify ({
      name: resourceName,
      resourceType: resourceType,
      location: resourceLink,
      description: description,
      review: resourceReview,
      categories: categories,
      rating: rating
    });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    const response = await fetch("https://ggvpaganoj.execute-api.ap-southeast-2.amazonaws.com/Development/resource", requestOptions)
    console.log(response);
  }

  return (
    <Container maxWidth='sm'>
      <Box bgcolor='white' color="black" className='box-generic'>
        <div className={classes.paper}>
          <h1>Add your own resource: </h1>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              onChange={(e) => setResourceName(e.target.value)}
            />
            <TextField 
              id="resourceType" 
              label="Type of Resource" 
              value={resourceType}
              select
              fullWidth
              variant="outlined"
              required
              margin="normal"
              onChange = {(e) => setResourceType(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Book">Book</MenuItem>
              <MenuItem value="Video">Video</MenuItem>
              <MenuItem value="Website">Website</MenuItem>
              <MenuItem value="Podcast">Podcast</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            {resourceType === "Other" && (
              <TextField
                id="userResourceType"
                label="Tell us the resource type?"
                name="userResourceType"
                fullWidth
                variant="outlined"
                margin="normal"
                value={userResourceType}
                onChange={(e) => setUserResourceType(e.target.value)}
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="resourceLink"
              label="Link to resource"
              name="resourceLink"
              autoFocus
              onChange={(e) => setResourceLink(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              rows={5}
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              fullWidth
              id="review"
              label="Review"
              name="review"
              autoFocus
              onChange={(e) => setResourceReview(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              multiline
              fullWidth
              id="categories"
              label="Add tags"
              name="categories"
              autoFocus
              onChange={(e) => setCategories(e.target.value)}
            />
            <h2>Rating:</h2>
            <Typography gutterBottom>Overall</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={5}
              min = {0}
              max={10}
              onChange = {(e, val) => setRating({...rating, "overall": `${val}`})}
            />
            <Typography gutterBottom>Ease of Understanding</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={5}
              min = {0}
              max={10}
              onChange = {(e, val) => setRating({...rating, "understanding": `${val}`})}
            />
            <Typography gutterBottom>Level of difficulty</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={5}
              min = {0}
              max={10}
              onChange = {(e, val) => setRating({...rating, "difficulty": `${val}`})}
            />
            <Typography gutterBottom>Reliability</Typography>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              aria-label="custom thumb label"
              defaultValue={5}
              min = {0}
              max={10}
              onChange = {(e, val) => setRating({...rating, "reliability": `${val}`})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add resource
            </Button>
          </form>
        </div>
      </Box>
    </Container>
  );
}