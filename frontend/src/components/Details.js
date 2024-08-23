import React from "react";
import { useGlobalContext } from "../context";
import { htmlTags, customStyles } from "../utilties";
import Select, { components } from "react-select";
import { FaChevronDown } from "react-icons/fa";
import "../costum-styles.css";
import axios from "axios";

const Details = () => {
  const {
    url,
    tag,
    className,
    searchText,
    handleUrl,
    handleTag,
    handleClassName,
    handleText,
    handleSubTag,
    subTag,
    getData,
  } = useGlobalContext();

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaChevronDown style={{ color: "#6b7280" }} />{" "}
        {/* Set your desired color here */}
      </components.DropdownIndicator>
    );
  };

  const options = () => {
    return htmlTags.map((tag) => ({ value: tag, label: tag }));
  };
  //organizing subtag select
  const selectedTag = options().find((option) => option.value === tag) || null;
  const selectedSubTag =
    options().find((option) => option.value === subTag) || null;

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* URL Input */}
      <input
        type="url"
        className="col-span-4 mb-3 row-start-1 rounded-md border bg-white/5 px-3.5 py-2 text-white shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => handleUrl(e.target.value)}
      />

      {/* Details */}
      <div className="flex justify-between gap-5 w-full col-span-4">
        {/* Text for Search */}
        <input
          type="text"
          className="rounded-md border bg-white/5 px-3.5 py- text-white shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500"
          placeholder="Text for search"
          value={searchText}
          onChange={(e) => handleText(e.target.value)}
        />

        {/* Class Name or ID */}
        <input
          type="text"
          className="rounded-md border bg-white/5 px-3.5 py-1 text-white shadow-sm focus:outline-none focus:ring-0 focus:border-indigo-500"
          placeholder="Class name or ID"
          value={className}
          onChange={(e) => handleClassName(e.target.value)}
        />

        {/* Tag Selector */}
        <Select
          value={selectedTag}
          placeholder="Select tag"
          unstyled
          styles={customStyles}
          components={{ DropdownIndicator }}
          options={options()}
          onChange={(selectedOption) =>
            handleTag(selectedOption ? selectedOption.value : "")
          }
          classNames={{
            control: () =>
              "rounded-md border bg-white/5 px-3.5 py-2 text-[#6b7280] shadow-sm border-[#6b7280] focus:outline-none focus:ring-0 focus:border-indigo-500",
          }}
        />
        {/* Sub Tags Section */}
        <Select
          value={selectedSubTag}
          placeholder="Select sub tag"
          unstyled
          styles={customStyles}
          components={{ DropdownIndicator }}
          options={options()}
          classNames={{
            control: () =>
              "rounded-md border bg-white/5 px-3.5 py-2 text-[#6b7280] shadow-sm border-[#6b7280] focus:outline-none focus:ring-0 focus:border-indigo-500",
          }}
          onChange={(selectedOption) =>
            handleSubTag(selectedOption ? selectedOption.value : "")
          }
        />
      </div>

      <button
        className="row-start-3 col-start-2 col-span-2 rounded-md bg-indigo-500 px-3.5 py-2.5 text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring focus:ring-indigo-500"
        onClick={() => {
          getData();
        }}
      >
        Scrape Data
      </button>

      {/* Summary of Inputs */}
      <div className="row-start-4 col-start-2 col-span-2 mt-4 p-4 border border-gray-300 rounded-md bg-white/5 text-white">
        <h3 className="text-lg text-white">Scrape Details:</h3>
        <p className="text-white">
          <strong className={url ? "text-indigo-500" : "text-[#6b7280]"}>
            URL:
          </strong>{" "}
          {url}
        </p>
        <p>
          <strong className={tag ? "text-indigo-500" : "text-[#6b7280]"}>
            Tag:
          </strong>{" "}
          {tag}
        </p>
        <p>
          <strong className={subTag ? "text-indigo-500" : "text-[#6b7280]"}>
            Sub Tags:
          </strong>{" "}
          {subTag}
        </p>
        <p>
          <strong className={className ? "text-indigo-500" : "text-[#6b7280]"}>
            Class/ID:
          </strong>{" "}
          {className}
        </p>
        <p>
          <strong className={searchText ? "text-indigo-500" : "text-[#6b7280]"}>
            Search Text:
          </strong>{" "}
          {searchText}
        </p>
      </div>
    </div>
  );
};

export default Details;
