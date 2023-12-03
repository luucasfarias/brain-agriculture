import { ChangeEvent, useState } from "react";
import InputMask from 'react-input-mask';

interface MaskedInputProps {
  type: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  mask: string,
  classValue: string
}

export function MaskedCpfCnpj({ type, name, value, onChange, mask, classValue }: MaskedInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  }

  return (
    <InputMask
      className={classValue}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      mask={mask}
    ></InputMask>
  );
}