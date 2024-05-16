"use client";
import { useAppDispatch } from "@/redux/hook";
import React, { useEffect, SetStateAction, Dispatch } from "react";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import { setLocation } from "@/redux/features/filterJobPostSlice";

interface SearchLocationProps {
  location: string[];
  setLocationFilter: Dispatch<SetStateAction<string[]>>;
}
const SearchLocation: React.FC<SearchLocationProps> = ({
  location,
  setLocationFilter,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocation(location));
  }, [location]);
  const removeLocationClick = (value: string) => {
    setLocationFilter((prev) => prev.filter((location) => location !== value));
  };

  return (
    <div>
      <div
        style={{ marginTop: "-13px", marginLeft: "-13px" }}
        className="collapse show"
        id="collapseLocation"
      >
        <div className="main-body">
          <form action="#" className="input-box position-relative">
            <LocationAutoComplete
              setSelected={setLocationFilter}
              type="cities"
              label="location"
              isMultiple={false}
              borderTrue={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchLocation;
