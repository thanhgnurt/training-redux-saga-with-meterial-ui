const styles = (theme) => ({
  paper: {
    top : "50%",
    left : "50%",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    outline: "none",
    width: "400px",
    position: "absolute",
    transform: "translate(-50%,-50%)",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ouline: "none",
    position: "absolute",
  },

  content: {
    padding: theme.spacing(2, 4, 3),
  },

  header: {
    backgroundColor: theme.color.primary,
    padding: theme.spacing(2),
    display: "flex",
    alignItem: "center",
    justifyContent: "space-between",
    color: theme.color.textLight,
  },

  tittle: {
    fontWeight: 500,
    color: theme.color.textLight,
    fontSize: 20,
    textTransform: "capitalize",
  },

  iconClose: {
    cursor: "poiter",
    fontSize: 26,
  },
});

export default styles;
