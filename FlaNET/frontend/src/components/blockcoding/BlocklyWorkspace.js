import React from "react";
import PropTypes from "prop-types";
import Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks";

Blockly.setLocale(locale);

class BlocklyWorkspace extends React.Component {
  constructor(props) {
    super(props);
    this.blocklyDiv = React.createRef();
    this.toolbox = React.createRef();
  }

  componentDidMount() {
    const { initialXml, ...rest } = this.props;

    this.primaryWorkspace = Blockly.inject(this.blocklyDiv.current, {
      toolbox: this.toolbox.current,
      ...rest,
    });

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(initialXml),
        this.primaryWorkspace
      );
    }
  }

  get workspace() {
    return this.primaryWorkspace;
  }

  setXml(xml) {
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(xml),
      this.primaryWorkspace
    );
  }

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <div className="blocklyDiv" ref={this.blocklyDiv} />
        <xml
          xmlns="https://developers.google.com/blockly/xml"
          is="blockly"
          style={{ display: "none" }}
          ref={this.toolbox}
        >
          {children}
        </xml>
      </React.Fragment>
    );
  }
}

BlocklyWorkspace.propTypes = {
  initialXml: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default BlocklyWorkspace;
