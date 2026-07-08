function JobSearch({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search jobs..."
      className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
    />
  );
}

export default JobSearch;