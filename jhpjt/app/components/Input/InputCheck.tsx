import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type InputCheckProps = {
  text: string;
};

export default function InputCheck({ text }: InputCheckProps) {
  return (
    <div>
      {text}
      <FontAwesomeIcon icon={faCheck} color="blue" />
    </div>
  );
}
