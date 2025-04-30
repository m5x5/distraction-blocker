import { styled } from "../../../../stitches.config";

const Container = styled("span", {
  backgroundColor: "$gray700",
});

export default function DedicationQuantityView({ value, ...props }) {
  let text;
  switch (value) {
    case 1:
      text = "Once a week";
      break;
    case 2:
      text = "Twice a week";
      break;
    case 3:
      text = "Three times a week";
      break;
    case 4:
      text = "Four times a week";
      break;
    case 5:
      text = "Five times a week";
      break;
    case 6:
      text = "Six times a week";
      break;
    case 7:
      text = "Every day";
      break;
    default:
      text = "";
  }

  return <Container {...props}>{text}</Container>;
}
