import React, { useState } from 'react';
import {produce} from "immer"

type TableProps = { 
    numRows: number, 
    numCols: number,
    table: number[][],
    setTable: React.Dispatch<React.SetStateAction<number[][]>>
};

function Table(props: TableProps) {
    
    let numRows = props.numRows;
    let numCols = props.numCols;
    let table = props.table;
    let setTable = props.setTable;

    return (
    <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 30px)`,
          background: "white"
        }}
      >
        {table.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newTable = produce(table, tableAux => {
                    tableAux[i][k] = table[i][k] ? 0 : 1;
                    console.log(i)
                    console.log(k)
                });
                setTable(newTable);
              }}
              style={{
                width: 27,
                height: 27,
                backgroundColor: table[i][k] ? "red" : undefined,
                border: "solid 2px black"
              }}
            />
          ))
        )}
      </div>
  );
}

export default Table;