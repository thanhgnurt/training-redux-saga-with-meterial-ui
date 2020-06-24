import React, { Component } from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import styles from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class SignupPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.signup}>
          <Card>
            <CardContent>
              <form>
                <div className="text-xs-center pd-xs">
                  <Typography variant="caption">Sign Up Account</Typography>
                </div>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="cpassword"
                  label="Comfirm Password"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <div className={classes.checkBox}>
                  <FormControlLabel
                    control={<Checkbox value="agre" />}
                    label="I agre with ...."
                  />
                </div>

                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.buttonSignup}
                  >
                    Sign Up
                  </Button>
                </div>

                <div className="mt-2 text-md-center">
                  <Link to="/Login">
                    <p>Are you have an acount ?</p>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
SignupPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SignupPage);
