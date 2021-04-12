import * as React from "react";
import * as Autosuggest from "react-autosuggest";
import "./AutosuggestComponent.css";

interface Props {
  onSuggestionSelected(selected: string): void;
  onSuggestionAreaCleared(): void;
  placeholder: string;
  data: string[];
}

export default function AutosuggestComponent({
  onSuggestionSelected,
  onSuggestionAreaCleared,
  placeholder,
  data,
}: Props) {
  const [value, setValue] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

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

  function onChange(
    event: React.MouseEvent,
    { newValue }: { newValue: string }
  ) {
    setValue(newValue);
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
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={() => {
        setSuggestions([]);
        onSuggestionAreaCleared();
      }}
      getSuggestionValue={(value: string) => value}
      renderSuggestion={(value: string) => <div>{value}</div>}
      inputProps={inputProps}
      highlightFirstSuggestion={true}
      selectFirstSuggestion={true}
      onSuggestionSelected={(
        event: React.MouseEvent,
        { suggestionValue }: { suggestionValue: string }
      ) => onSuggestionSelected(suggestionValue)}
    />
  );
}
