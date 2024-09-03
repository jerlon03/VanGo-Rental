import React from 'react';
import { FaRegEdit } from '@/components/icons/index'; // Adjust paths as necessary
import { MdDeleteOutline } from '@/components/icons/index'; // Adjust paths as necessary

interface Column {
  label: string;
  key: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const Table = <T,>({ data, columns, onEdit, onDelete }: TableProps<T>) => {
  // Add a new column configuration for the Actions column
  const extendedColumns = [...columns, { label: 'Actions', key: 'actions' }];

  return (
    <div className="overflow-x-auto text-blackColor">
      <table className="min-w-full bg-white border">
        <thead className=''>
          <tr className="bg-primaryColor">
            {extendedColumns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-2 text-left text-[14px] font-normal text-white ${
                  column.key === 'actions' ? 'flex justify-end' : ''
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
              {extendedColumns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    column.key === 'actions' ? 'flex justify-end' : ''
                  }`}
                >
                  {column.key === 'actions' ? (
                    <div className="flex space-x-1 items-center">
                      {onEdit && (
                        <FaRegEdit onClick={() => onEdit(row)} className='text-primaryColor cursor-pointer' size={18} />
                      )}
                      {onDelete && (
                        <MdDeleteOutline onClick={() => onDelete(row)} className='text-red-400 cursor-pointer' size={22} />
                      )}
                    </div>
                  ) : (
                    (row as any)[column.key]
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
