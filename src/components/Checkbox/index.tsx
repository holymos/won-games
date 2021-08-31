import { InputHTMLAttributes, useState } from "react";
import * as S from "./styles";

export type CheckboxProps = {
  label?: string;
  labelFor?: string;
  labelColor?: "white" | "black";
  isChecked?: boolean;
  value?: string | ReadonlyArray<string> | number | undefined;
  onCheck?: (status: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({
  label,
  labelFor = "",
  labelColor = "white",
  isChecked = false,
  value,
  onCheck,
  ...props
}: CheckboxProps) {
  const [checked, setChecked] = useState(isChecked);

  function onChange() {
    const status = !checked;

    setChecked(status);

    !!onCheck && onCheck(status);
  }

  return (
    <S.Wrapper>
      <S.Input
        type="checkbox"
        id={labelFor}
        onChange={onChange}
        checked={checked}
        value={value}
        {...props}
      />
      {!!label && (
        <S.Label htmlFor={labelFor} labelColor={labelColor}>
          {label}
        </S.Label>
      )}
    </S.Wrapper>
  );
}
