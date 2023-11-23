import { useGlobalContext } from "../context";

const Details = () => {
  const { url,tagName, handleUrl, handleTag, handleClassName, handleText,getData } =
    useGlobalContext();

  return (
    <div className="grid grid-cols-3 gap-4">
      <input
        type="url"
        className="w-full mb-3 rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 col-span-3"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => handleUrl(e.target.value)}
      />
      <div className="col-span-3">
        <div className="flex justify-center	gap-5">
          {" "}
          <label className="mt-2 text-base leading-2 text-gray-300">
            Add text for search:
          </label>
          <input
            type="text"
            className="mb-3 rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Included Texts"
            value={null}
            onChange={(e) => handleText(e.target.value)}
          />
        </div>

        <select
          className="w-full mb-3 rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          value={tagName}
          onChange={(e) => handleTag(e.target.value)}
        >
          <option value="">Select Tag</option>
          <option value="div">Div</option>
          <option value="span">Span</option>
          <option value="a">Anchor (a)</option>
        </select>
        <button
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 col-start-2"
          onClick={getData}
        >
          Add sub tags
        </button>
        <select
          className="w-full mb-3 rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          value={tagName}
          onChange={(e) => handleTag(e.target.value)}
        >
          <option value="">Select Tag</option>
          <option value="div">Div</option>
          <option value="span">Span</option>
          <option value="a">Anchor (a)</option>
        </select>
      </div>

      <button
        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 col-start-2"
        onClick={getData}
      >
        Scrape Data
      </button>
    </div>
  );
};

export default Details;
