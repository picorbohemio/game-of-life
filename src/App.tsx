import React, { useCallback, useRef, useState } from 'react';
import './App.css';
import {produce} from "immer"
import Table from './components/Table';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const numRows = 40;
const numCols = 40;

const positions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1]
];


const generateEmptyTable= () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const generateOscilateTable= () => {
  const rows = generateEmptyTable();
  
  rows[10][19]= 1;
  rows[10][21]= 1;
  rows[9][19]= 1;
  rows[9][21]= 1;
  rows[8][19]= 1;
  rows[8][21]= 1;
  rows[14][19]= 1;
  rows[14][21]= 1;
  rows[15][19]= 1;
  rows[15][21]= 1;
  rows[16][19]= 1;
  rows[16][21]= 1;
  
  rows[11][22]= 1;
  rows[11][23]= 1;
  rows[11][24]= 1;
  rows[13][22]= 1;
  rows[13][23]= 1;
  rows[13][24]= 1;
  rows[11][16]= 1;
  rows[11][17]= 1;
  rows[11][18]= 1;
  rows[13][16]= 1;
  rows[13][17]= 1;
  rows[13][18]= 1;

  rows[6][18]= 1;
  rows[6][17]= 1;
  rows[6][16]= 1;
  rows[6][22]= 1;
  rows[6][23]= 1;
  rows[6][24]= 1;
  rows[10][14]= 1;
  rows[9][14]= 1;
  rows[8][14]= 1;
  rows[10][26]= 1;
  rows[9][26]= 1;
  rows[8][26]= 1;

  rows[18][22]= 1;
  rows[18][23]= 1;
  rows[18][24]= 1;
  rows[18][16]= 1;
  rows[18][17]= 1;
  rows[18][18]= 1;
  rows[14][26]= 1;
  rows[15][26]= 1;
  rows[16][26]= 1;
  rows[14][14]= 1;
  rows[15][14]= 1;
  rows[16][14]= 1;

  return rows;
};

function App() {

  const [table, setTable] = useState(() => {
    return generateEmptyTable();
  });

  const [execute, setExecute] = useState(false);

  const executeRef = useRef(execute);
  executeRef.current = execute;

  const runSimulation = useCallback(() => {
    if (!executeRef.current) {
      return;
    }

    setTable(t => {
      return produce(t, tableAux => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            positions.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += t[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              tableAux[i][k] = 0;
            } else if (t[i][k] === 0 && neighbors === 3) {
              tableAux[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);


  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} style={{paddingTop: 20}}>
        <Grid size={12} display="flex" justifyContent="center" alignItems="center">
          <Stack spacing={1}>
            <Typography variant="h4" gutterBottom>
              EL JUEGO DE LA VIDA
            </Typography>
            <Typography variant="h5" display="flex" justifyContent="center" alignItems="center">
              <Link href="https://es.wikipedia.org/wiki/Juego_de_la_vida ">
                REGLAS
              </Link>
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12} display="flex" justifyContent="center" alignItems="center">
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setExecute(!execute);
                if (!execute) {
                  executeRef.current = true;
                  runSimulation();
                }
              }}
            >
              {execute ? "DETENER" : "INICIAR"}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setTable(generateEmptyTable());
                setExecute(false);
              }}
            >
              LIMPIAR
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                  rows.push(
                    Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
                  );
                }

                setTable(rows);
                setExecute(false);
              }}
            >
              RANDOMIZAR
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                const rows = generateOscilateTable();
                setTable(rows);
                setExecute(false);
              }}
            >
              OSCILANTE
            </Button>
          </Stack>
        </Grid>
        <Grid size={12} display="flex" justifyContent="center" alignItems="center">
          <Table 
            numCols={numCols}
            numRows={numRows}
            table={table} 
            setTable={setTable}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
