import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as modalActions from "./../../actions/modal";

class ModalTodo extends Component {
  render() {
    const {
      classes,
      open,
      component,
      modalActionCreators,
      tittle,
    } = this.props;
    const { hideModal } = modalActionCreators;
    return (
      <Modal open={open} onClose={hideModal} >
        <div className={classes.paper}>
          <div className={classes.header}>
            <span className={classes.tittle}>{tittle}</span>
            <CloseIcon className={classes.iconClose} onClick={hideModal} />
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}

Modal.prototype = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  component: PropTypes.object,
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  tittle: PropTypes.string,
};

const mapStateToProps = (state) => ({
  open: state.modal.showModal,
  component: state.modal.component,
  tittle: state.modal.tittle,
});
const mapDispatchToProps = (dispatch) => ({
  modalActionCreators: bindActionCreators(modalActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(ModalTodo);
