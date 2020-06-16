import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    color : {
        primary : "#D32F2F",
        secondary : "#00BCD4",
        error: "#FFA000",
        textLight : "white"
    },
    typography : {
        fontFamily : "Roboto"
    },
    shape : {
        borderRadius : 4,
        backgroundColor : "#7B1FA2",
        textColor : "white",
        borderColor :"#CCCCC",
    }

  });

  export default theme;
