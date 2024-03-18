import NiceSelect from "@/ui/nice-select";
import React from "react";

interface Props {
  firstInput: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  default?: { value: string; label: string };
}

const SelectMonth = ({
  default: defaultOption,
  setMonth,
  firstInput,
}: Props) => {
  const handleYear = (item: { value: string; label: string }) => {
    setMonth(item.value);
  };

  const options = [
    { value: "Jan", label: "Jan" },
    { value: "Feb", label: "Feb" },
    { value: "Mar", label: "Mar" },
    { value: "Apr", label: "Apr" },
    { value: "May", label: "May" },
    { value: "Jun", label: "Jun" },
    { value: "Jul", label: "Jul" },
    { value: "Aug", label: "Aug" },
    { value: "Sep", label: "Sep" },
    { value: "Oct", label: "Oct" },
    { value: "Nov", label: "Nov" },
    { value: "Dec", label: "Dec" },
  ];

  options.unshift({ value: firstInput, label: firstInput });
  let def = 0;
  if (defaultOption) {
    console.log(defaultOption);
    const index = options.findIndex(
      (option) => option.value === defaultOption.value
    );
    if (index !== -1) {
      def = index;
    }
  }

  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        isScroll={true}
        options={options}
        defaultCurrent={def}
        onChange={(item) => handleYear(item)}
        name="Year"
      />
    </div>
  );
};

export default SelectMonth;
