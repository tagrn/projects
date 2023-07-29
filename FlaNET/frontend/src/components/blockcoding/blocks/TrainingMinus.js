import Blockly from "blockly";

export default function createTrainingMinus(args) {
  const minus = new Blockly.FieldImage(minusImage, 15, 15, undefined, onClick_);

  minus.args_ = args;
  return minus;
}

function onClick_(minusField) {
  const block = minusField.getSourceBlock();

  if (block.isInFlyout) {
    return;
  }

  Blockly.Events.setGroup(true);

  const oldMutationDom = block.mutationToDom();
  const oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);

  block.minus(minusField.args_);

  const newMutationDom = block.mutationToDom();
  const newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);

  if (oldMutation !== newMutation) {
    Blockly.Events.fire(
      new Blockly.Events.BlockChange(
        block,
        "mutation",
        null,
        oldMutation,
        newMutation
      )
    );
  }
  Blockly.Events.setGroup(false);
}

const minusImage =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw" +
  "MC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPS" +
  "JNMTggMTFoLTEyYy0xLjEwNCAwLTIgLjg5Ni0yIDJzLjg5NiAyIDIgMmgxMmMxLjEwNCAw" +
  "IDItLjg5NiAyLTJzLS44OTYtMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K";
