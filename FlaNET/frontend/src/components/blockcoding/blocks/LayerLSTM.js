import Blockly from "blockly";

Blockly.Blocks.LSTM = {
  init() {
    this.appendDummyInput().appendField("LSTM");
    this.appendDummyInput()
      .appendField("     유닛 크기 ")
      .appendField(new Blockly.FieldTextInput("64"), "units");
    this.setColour("#0FC9F2");
    this.setOutput(true, "String");
    this.setTooltip(
      "LSTM Layer는 시계열 데이터에서 시간 스텝 간의 장기 종속성을 학습합니다."
    );
  },
};
