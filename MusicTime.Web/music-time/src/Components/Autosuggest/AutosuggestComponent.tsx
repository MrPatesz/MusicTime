import * as React from "react";
import * as Autosuggest from "react-autosuggest";
import "./AutosuggestComponent.css";

interface Props {
  onValueChanged(selected: string): void;
  placeholder: string;
  data: string[];
  maxLength: number;
}

export default function AutosuggestComponent({
  onValueChanged,
  placeholder,
  data,
  maxLength,
}: Props) {
  const [value, setValue] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<string[]>(data);

  function* filter(
    array: string[],
    condition: (c: string) => boolean,
    maxSize: number
  ) {
    if (!maxSize || maxSize > array.length) {
      maxSize = array.length;
    }
    let count = 0;
    let i = 0;
    while (count < maxSize && i < array.length) {
      if (condition(array[i])) {
        yield array[i];
        count++;
      }
      i++;
    }
  }

  function onChange(_: React.MouseEvent, { newValue }: { newValue: string }) {
    if (newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
    }
    setValue(newValue);
    onValueChanged(newValue);
  }

  function onSuggestionsFetchRequested({ value }: { value: string }) {
    setValue(value);
    setSuggestions(
      Array.from(
        filter(
          data,
          (t: string) => t.toLowerCase().includes(value.toLowerCase()),
          10
        )
      )
    );
  }

  const inputProps = {
    placeholder: placeholder,
    value: value,
    onChange: onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      inputProps={inputProps}
      highlightFirstSuggestion={true}
      selectFirstSuggestion={true}
      alwaysRenderSuggestions={false}
      shouldRenderSuggestions={() => true}
      getSuggestionValue={(value: string) => value}
      renderSuggestion={(value: string) => <div>{value}</div>}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={() => setSuggestions([])}
      onSuggestionSelected={(
        _: React.MouseEvent,
        { suggestionValue }: { suggestionValue: string }
      ) => onValueChanged(suggestionValue)}
    />
  );
}
