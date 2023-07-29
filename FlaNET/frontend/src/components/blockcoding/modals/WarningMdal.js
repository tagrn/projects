import PropTypes from "prop-types";
import React from "react";

const WarningMdal = ({ open, close, title, content }) => {
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section className="modal-size-1">
          <header>
            {title}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main className="modal-size-2">
            <h3> {content}</h3>
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

WarningMdal.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default WarningMdal;
