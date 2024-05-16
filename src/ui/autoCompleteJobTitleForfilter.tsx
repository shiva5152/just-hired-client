import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Combobox, Transition } from "@headlessui/react";
import instance from "@/lib/axios";
import {
  addCompanyCategoryToDB,
  addPositionToDB,
} from "@/redux/features/employer/api";
import { useAppDispatch } from "@/redux/hook";
import { notifySuccess, notifyError } from "@/utils/toast";
import { setJobTitle } from "@/redux/features/filterJobPostSlice";

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  endPoint: string;
  suggestionsProp?: string[];
  placeholder?: string;
  showAdd?: boolean;
  disabled?: boolean;
  addTo?: string;
  top?: boolean;
}

function AutocompletePosition({
  selected,
  setSelected,
  endPoint,
  suggestionsProp = [],
  placeholder = "Job Title",
  showAdd = false,
  disabled = false,
  top = false,
  addTo = "Position",
}: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    // console.log(query.length);

    const callApi = async () => {
      try {
        if (query.length >= 3) {
          if (suggestionsProp.length > 0) {
            const filteredOptions: string[] = suggestionsProp.filter((option) =>
              option.toLowerCase().includes(query.toLowerCase())
            );
            setLanguages(filteredOptions);
          } else {
            const { data } = await instance.get(
              `${endPoint}/search?query=${query}`
            );
            setSuggestions(data);
            console.log(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    callApi();
  }, [query]);

  const handleAdd = () => {
    if (addTo === "Position") {
      addPositionToDB(dispatch, query);
    } else {
      addCompanyCategoryToDB(dispatch, query);
    }
    // addCompanyCategoryToDB(dispatch,query);
    setSelected(query);
  };

  const handleChange = (value: string) => {
    dispatch(setJobTitle(value));
    setSelected(value);
  };

  return (
    <div className="nice-select" style={{ border: "none", padding: "0" }}>
      <Combobox
        value={selected}
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      >
        <div className="">
          <div className="">
            <Combobox.Input
              className=""
              placeholder={placeholder}
              displayValue={() => selected}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query.length >= 3 && showAdd && (
              <p
                onClick={handleAdd}
                title="Create A new company if not found"
                className="skill-add btn-one position-absolute px-3 py-0"
                style={{
                  zIndex: 10,
                  top: top ? "50%" : "12%",
                  right: "5%",
                  transform: "translateY(-50%)",
                }}
              >
                add
              </p>
            )}
          </div>
          <Transition
            as={Fragment}
            leave=""
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="_my_nice_select_options _my_nice_select_options_extended">
              {suggestions.length === 0 &&
              query !== "" &&
              languages.length === 0 ? (
                <div className=" px-4">Nothing found.</div>
              ) : languages.length > 0 ? (
                languages.map((language: string, id: number) => (
                  <Combobox.Option
                    key={id}
                    className={({ active }) =>
                      `option ${active && "selected focus"}`
                    }
                    value={language}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-normal" : "font-normal"
                          }`}
                        >
                          {language}
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
              ) : suggestions.length !== 0 && query !== "" ? (
                suggestions.map((person: any) => (
                  <Combobox.Option
                    key={person._id}
                    className={({ active }) =>
                      `option ${active && "selected focus"}`
                    }
                    value={person.name}
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
              ) : null}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default AutocompletePosition;
