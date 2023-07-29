import Blockly from "blockly";

Blockly.Blocks.Conv1D = {
  init() {
    this.appendDummyInput().appendField("Convolution Layer");
    this.appendDummyInput()
      .appendField("     필터 크기 ")
      .appendField(new Blockly.FieldTextInput("64"), "filters");
    this.appendDummyInput()
      .appendField("     커널 크기 ")
      .appendField(new Blockly.FieldTextInput("3"), "kernel_size");
    this.setColour("#0FC9F2");
    this.setOutput(true, "String");
    this.setTooltip(
      "Convolution Layer는 입력 데이터에 필터를 적용 후 활성화 함수를 반영하는 필수 요소입니다."
    );
  },
};
