import { dateFormatConversion } from "../../utils/dateFormatConversion";

const Table = ({
  columns,
  data,
  actions,
  currentPage = 1,
  totalPages = 1,
  onNext,
  onPrevious,
  hasPaginationNeeded = true,
  selectionType,
  selectedRows,
  title = "",
  onSelectionChange,
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(data.map((row) => row.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleRowSelection = (rowId) => {
    if (selectionType === "single") {
      onSelectionChange([rowId]);
    }
    if (selectionType === "multiple") {
      const isSelected = selectedRows.includes(rowId);

      if (isSelected) {
        onSelectionChange(selectedRows.filter((id) => id !== rowId));
      } else {
        onSelectionChange([...selectedRows, rowId]);
      }
    }
  };
  if (data?.length === 0) {
    return <h1 className="flex justify-center">Not data found</h1>;
  }
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border rounded-2xl h-[70vh] border-gray-500 border-default">
      <h1 className=" font-bold text-lg py-3 ml-5">{title}</h1>
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
          <tr>
            {selectionType && (
              <th className="px-6 py-3">
                {selectionType === "multiple" && (
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 && selectedRows.length === data.length
                    }
                    onChange={handleSelectAll}
                  />
                )}
              </th>
            )}

            {columns?.map((column) => (
              <th key={column?.key} scope="col" className="px-6 py-3">
                {column?.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr
              key={row._id}
              className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
            >
              {selectionType && (
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row._id)}
                    onChange={() => handleRowSelection(row._id)}
                  />
                </td>
              )}

              {columns?.map((column) => (
                <td key={column.key} className="px-6 py-4">
  {column.key === "createdAt" ||
  column.key === "dueDate"
    ? dateFormatConversion(row[column.key])
    : column.render
    ? column.render(row)
    : row[column.key]}
</td>
              ))}
              {actions && <td className="px-6 py-4">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {hasPaginationNeeded && (
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={onNext}
            disabled={currentPage * 10 >= totalPages}
            className="px-3 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
