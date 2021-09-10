import { useState } from "react";
import { Close } from "@styled-icons/material-outlined/Close";
import { FilterList } from "@styled-icons/material-outlined/FilterList";

import { Button } from "components/Button";
import { Checkbox } from "components/Checkbox";
import { Heading } from "components/Heading";
import { Radio } from "components/Radio";

import * as S from "./styles";

type Field = {
  label: string;
  name: string;
};

export type ItemProps = {
  title: string;
  name: string;
  type: "checkbox" | "radio";
  fields: Field[];
};

export type Values = {
  [field: string]: boolean | string;
};

export type ExploreSidebarProps = {
  items: ItemProps[];
  initialValues?: Values;
  onFilter: (values: Values) => void;
};

export function ExploreSidebar({
  items,
  initialValues = {},
  onFilter
}: ExploreSidebarProps) {
  const [values, setValues] = useState<Values>(initialValues);
  const [isOpen, setIsOpen] = useState(false);

  function handleFilter() {
    onFilter(values);
    setIsOpen(false);
  }

  function handleChange(name: string, value: boolean | string) {
    setValues((oldValues) => ({
      ...oldValues,
      [name]: value
    }));
  }

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Overlay aria-hidden={isOpen} />
      <S.IconWrapper>
        <FilterList aria-label="open filters" onClick={() => setIsOpen(true)} />
        <Close aria-label="close filters" onClick={() => setIsOpen(false)} />
      </S.IconWrapper>

      <S.Content>
        {items.map((item) => (
          <S.Items key={item.title}>
            <Heading lineBottom lineColor="secondary" size="small">
              {item.title}
            </Heading>

            {item.type === "checkbox" &&
              item.fields.map((field) => (
                <Checkbox
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  labelFor={field.name}
                  isChecked={!!values[field.name]}
                  onCheck={(v) => handleChange(field.name, v)}
                />
              ))}

            {item.type === "radio" &&
              item.fields.map((field) => (
                <Radio
                  key={field.name}
                  id={field.name}
                  name={item.name}
                  value={field.name}
                  label={field.label}
                  labelFor={field.name}
                  defaultChecked={field.name === values[item.name]}
                  onChange={() => handleChange(item.name, field.name)}
                />
              ))}
          </S.Items>
        ))}
      </S.Content>

      <S.Footer>
        <Button fullWidth size="medium" onClick={handleFilter}>
          Filter
        </Button>
      </S.Footer>
    </S.Wrapper>
  );
}
