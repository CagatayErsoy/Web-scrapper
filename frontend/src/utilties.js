const htmlTags = [
  "<title>",
  "article",
  "<h1>",
  "<h2>",
  "<h3>",
  "<h4>",
  "<h5>",
  "<h6>",
  "<p>",
  "<br>",
  "<hr>",
  "<a>",
  "<img>",
  "<div>",
  "<span>",
  "<ul>",
  "<ol>",
  "<li>",
  "<table>",
  "<tr>",
  "<th>",
  "<td>",
  "<form>",
  "<input>",
  "<button>",
  "<label>",
  "<select>",
  "<option>",
  "<link>",
  "<meta>",
  "<style>",
  "<script>",
];
export { htmlTags };

// costum styles for dropdowns
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "44px", // Adjusted height
    width: "11rem", // Set width
    backgroundColor: "rgba(31, 41, 55, 0.05)", // Equivalent to bg-white/5 in Tailwind
    borderColor: state.isFocused ? "rgb(99 102 241)" : "#6b7280", // Focus and default border color
    borderRadius: "0.375rem", // Rounded corners
    color: "#6b7280", // Text color
    boxShadow: state.isFocused ? "0 0 0 1px rgb(99 102 241)" : null, // Remove box-shadow, add focus ring
    "&:hover": {
      borderColor: "rgb(99 102 241)", // Border color on hover
    },
  }),

  input: (base) => ({
    ...base,
    color: "white", // Text color inside the input
    "& input:focus": {
      boxShadow: "none", // Remove box-shadow on focus
    },
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    color: "#6b7280", // Color of the indicator container
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255)", // Background color of the dropdown menu
    borderRadius: "0.375rem", // Rounded border
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // Shadow similar to shadow-sm
    color: "#1f2937", // Text color inside the menu
  }),

  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "white" : "#1f2937", // Text color changes on focus
    backgroundColor: state.isFocused ? "rgba(55, 65, 81)" : "transparent", // Background color changes on focus
    height: "38px",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    "&:hover": {
      backgroundColor: "rgba(55, 65, 81)", // Background color on hover
      color: "white", // Text color on hover
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff", // Set your desired color for the selected value here
  }),
};

export { customStyles };
