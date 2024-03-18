import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Combobox, Transition } from "@headlessui/react";
import instance from "@/lib/axios";

interface Props {
  selected: { name: string; companyId: string };
  setSelected: React.Dispatch<
    React.SetStateAction<{ name: string; companyId: string }>
  >;
  endPoint: string;
}

function AutocompletePosition({ selected, setSelected, endPoint }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //   console.log(selected);

  useEffect(() => {
    // console.log(query.length);

    const callApi = async () => {
      try {
        if (query.length >= 3) {
          const { data } = await instance.get(
            `${endPoint}/search?query=${query}`
          );
          console.log(data);
          setSuggestions(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    callApi();
  }, [query]);
  return (
    <div className="nice-select" style={{ border: "none", padding: "0" }}>
      <Combobox
        value={selected}
        onChange={(selectedOption: any) => {
          setSelected({
            name: selectedOption ? selectedOption.person.name : "",
            companyId: selectedOption ? selectedOption.person._id : "",
          });
        }}
      >
        <div className="">
          <div className="">
            <Combobox.Input
              className=""
              placeholder="type title"
              displayValue={() => selected.name}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave=""
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="_my_nice_select_options _my_nice_select_options_extended">
              {suggestions.length === 0 && query !== "" ? (
                <div className=" px-4">Nothing found.</div>
              ) : (
                suggestions.map((person: any) => (
                  <Combobox.Option
                    key={person._id}
                    className={({ active }) =>
                      `option ${active && "selected focus"}`
                    }
                    value={{ person }}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-normal" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            // onClick={() => selected(person)}
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default AutocompletePosition;
