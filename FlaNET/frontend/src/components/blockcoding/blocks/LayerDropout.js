import Blockly from "blockly";

Blockly.Blocks.Dropout = {
  init() {
    this.appendDummyInput().appendField("Dropout");
    this.appendDummyInput()
      .appendField("     확률 ")
      .appendField(new Blockly.FieldTextInput("ex. 0.5 (0 ~ 1)"), "rate");
    this.setColour("#0FC9F2");
    this.setOutput(true, "String");
    this.setTooltip(
      "Dropout은 딥러닝 학습 과정 중 발생할 수 있는 Overfitting(과적합) 문제를 방지합니다."
    );
  },
};
