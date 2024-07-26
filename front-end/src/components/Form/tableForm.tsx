// components/Table.tsx

import React from 'react';

interface TableProps {
  data: any[]; // Array of objects for table rows
  columns: {
    label: string;
    key: string;
  }[]; // Array of column configurations
  onEdit?: (row: any) => void; // Optional function for edit action
  onDelete?: (row: any) => void; // Optional function for delete action
}

const Table: React.FC<TableProps> = ({ data, columns, onEdit, onDelete }) => {
  // Add a new column configuration for the Actions column
  const extendedColumns = [...columns, { label: 'Actions', key: 'actions' }];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className='rounded-[10px]'>
          <tr className="bg-primaryColor">
            {extendedColumns.map((column, columnIndex) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-[14px] font-normal text-white ${
                  columnIndex === extendedColumns.length - 1 ? 'flex justify-end' : ''
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {extendedColumns.map((column, columnIndex) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                    columnIndex === extendedColumns.length - 1 ? 'flex justify-end' : ''
                  }`}
                >
                  {column.key === 'actions' ? (
                    <div className="flex space-x-2">
                      {onEdit && (
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => onEdit(row)}
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => onDelete(row)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
