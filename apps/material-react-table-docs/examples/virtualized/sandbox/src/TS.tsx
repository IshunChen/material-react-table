import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import type { SortingState } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';
import { makeData, Person } from './makeData';

const Example: FC = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
        size: 150,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 300,
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        size: 250,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 300,
      },
      {
        accessorKey: 'zipCode',
        header: 'Zip Code',
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 220,
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 350,
      },
      {
        accessorKey: 'petName',
        header: 'Pet Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
      },
      {
        accessorKey: 'dateOfJoining',
        header: 'Date of Joining',
      },
      {
        accessorKey: 'isActive',
        header: 'Is Active',
      },
    ],
    [],
    //end
  );

  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef =
    useRef<Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(10_000));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    rowVirtualizerInstanceRef.current?.scrollToIndex(0);
  }, [sorting]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data} //10,000 rows
      enableBottomToolbar={false}
      enableColumnVirtualization
      enableGlobalFilterModes
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableRowVirtualization
      muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
      onSortingChange={setSorting}
      state={{ isLoading, sorting }}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //optional
      rowVirtualizerProps={{ overscan: 5 }} //optionally customize the row virtualizer
      columnVirtualizerProps={{ overscan: 2 }} //optionally customize the column virtualizer
    />
  );
};

//virtualizerInstanceRef was renamed to rowVirtualizerInstanceRef in v1.5.0
//virtualizerProps was renamed to rowVirtualizerProps in v1.5.0

export default Example;
