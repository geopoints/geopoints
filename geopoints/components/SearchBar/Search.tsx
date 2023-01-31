//@ts-nocheck
// todo: add types
import { useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import AutocompleteItem from './AutocompleteItem';

export default function Search(props: any) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Search lists...',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'lists-next-api',
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(`/api/search?q=${query}`).then((res) =>
                  res.json()
                );
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form ref={formRef} className="flex justify-center mb-20" {...formProps}>
      <div className="flex relative mt-3">
        <input
          ref={inputRef}
          className=" p-5 ml-2 rounded-full w-60 text-gray-800"
          {...inputProps}
        />
        {autocompleteState.isOpen && (
          <div
            className="absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded shadow-lg z-10"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection;
              console.log({ items });
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <AutocompleteItem
                          key={item.id}
                          list={item}
                          author={item.author}
                        />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
}