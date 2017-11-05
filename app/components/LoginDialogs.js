import React, { Component } from 'react';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade';
import List, { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import styles from './Home.css';

class LoginDialogs extends Component {
  props: {
    title: {},
    classes: {},
    login: {},
    loginChange: (string, string | number | boolean) => void,
    loginSagas: () => void
  };

  render() {
    const { title, classes, login, loginChange, loginSagas } = this.props;
    return (
      <Dialog
        open={login.open}
        transition={Fade}
        onRequestClose={() => loginChange('open', false)}
      >
        <DialogTitle />
        <div className={styles.loginIcon} />
        <DialogContent>
          <List>
            <ListItem>
              <TextField
                label={title.loginDialogs.username}
                value={login.username}
                onChange={(event) => loginChange('username', event.target.value)}
                className={classes.textField}
              />
            </ListItem>
            <ListItem>
              <TextField
                label={title.loginDialogs.password}
                value={login.password}
                onChange={(event) => loginChange('password', event.target.value)}
                className={classes.textField}
              />
            </ListItem>

            {/* login.captchaOpen &&
            <List>
              <ListItem>
                <img src={login.captchaSrc} alt="Error: captcha not find" />
              </ListItem>
              <ListItem>
                <br />
                <TextField
                  label={title.loginDialogs.captcha}
                  value={login.captcha}
                  onChange={(event) => loginChange('captcha', event.target.value)}
                  className={classes.textField}
                />
              </ListItem>
            </List>
            */}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            console.log(loginSagas(login.username, login.password));
          }}
          >
            {title.login}
          </Button>
          <Button onClick={() => loginChange('open', false)}>
            {title.loginDialogs.close}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const muiStyles = theme => ({
  textField: {
    width: 250
  }
});

export default withStyles(muiStyles)(LoginDialogs);
