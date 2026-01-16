"use client";
import { useState, useEffect, ReactNode } from "react";
import { format, set } from 'date-fns';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ButtonAppBar from '../../../components/ButtonAppBar';
import '../../globals.css';
import Link from "@mui/material/Link";

export default function App() {

    const columns: GridColDef[] = [
        { field: 'first_name', headerName: 'First Name', flex: 1 },
        { field: 'last_name', headerName: 'Last name', flex: 1 },
        { field: 'age', headerName: 'Age', flex: 1, type: 'number' },
        {
            field: 'gender',
            headerName: 'Gender',
            type: 'string',
            flex: 1,
        },
        {
            field: 'paid_in_full',
            headerName: 'Paid in Full',
            type: 'boolean',
            flex: 1,
        },
        {
            field: 'amount_paid',
            headerName: 'Amount Paid',
            type: 'number',
            flex: 1,
            valueFormatter: (value, row) => {
                const amount: number = row.amount_paid;
                return `$${amount.toFixed(2)}`;
            },
        },
        {
            field: 'days',
            headerName: 'Days',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 2,
            type: 'date',
            valueGetter: (value, row) => row.dates.map((date: string) => new Date(date)),
            valueFormatter: (value, row) => {
                let dates: Date[] = row.dates;
                return dates.map(d => format(d, 'MM/dd/yyyy')).filter(d => weeks[selectedWeek].includes(d)).join(', ');
            },
        },
        {
            field: 'details',
            headerName: 'Details',
            sortable: false,
            flex: 1,
            minWidth: 100,
            disableExport: true,
            renderCell: (params: any) => {
                const id = params?.row?.id;
                return (
                    <Link href={`/admin/participants/${id}`}>
                        <Button variant="contained" size="small">View Details</Button>
                    </Link>
                );
            },
        },
    ];

    const paginationModel = {  };

    const [participants, setParticipants] = useState<any[]>([]);
    const [selectedWeeksParticipants, setSelectedWeeksParticipants] = useState<any[]>([]);
    type WeekKey = 0 | 1 | 2 | 3 | 4;
    const [selectedWeek, setSelectedWeek] = useState<WeekKey>(0);
    const weeks: Record<WeekKey, string[]> = {
        0: ['06/29/2026', '06/30/2026', '07/01/2026', '07/02/2026'].concat(
            ['07/06/2026', '07/07/2026', '07/08/2026', '07/09/2026'],
            ['07/13/2026', '07/14/2026', '07/15/2026', '07/16/2026'],
            ['07/20/2026', '07/21/2026', '07/22/2026', '07/23/2026']
        ),
        1: ['06/29/2026', '06/30/2026', '07/01/2026', '07/02/2026'],
        2: ['07/06/2026', '07/07/2026', '07/08/2026', '07/09/2026'],
        3: ['07/13/2026', '07/14/2026', '07/15/2026', '07/16/2026'],
        4: ['07/20/2026', '07/21/2026', '07/22/2026', '07/23/2026'],
    };

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        async function load() {
            try {
                const response = await fetch("http://localhost:8080/participants", { signal: controller.signal });
                if (!response.ok) {
                    console.error("Failed to fetch participants", response.status);
                    return;
                }
                const data = await response.json();
                if (mounted) setParticipants(data);
            } catch (err: any) {
                if (err.name === 'AbortError') return;
                console.error("Error fetching participants:", err);
            }
        }

        load();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);
    
    useEffect(() => {
        const selected = participants.filter(participant => {
            const participantDates = (participant.dates || []).map((dateStr: string) => {
                const date = new Date(dateStr);
                return format(date, 'MM/dd/yyyy');
            });
            console.log('Participant Dates:', participantDates);
            return selectedWeek === 0 ? participantDates : weeks[selectedWeek].some(weekDate => participantDates.includes(weekDate));
        });
        setSelectedWeeksParticipants(selected);
    }, [participants, selectedWeek]);

    const handleChange = (event: SelectChangeEvent, _child?: ReactNode) => {
        setSelectedWeek(Number(event.target.value) as WeekKey);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ButtonAppBar />
            <div className="content admin">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Week</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={String(selectedWeek)}
                        label="Week"
                        onChange={handleChange}
                        >
                        <MenuItem value="0">All Weeks</MenuItem>
                        <MenuItem value="1">Week 1</MenuItem>
                        <MenuItem value="2">Week 2</MenuItem>
                        <MenuItem value="3">Week 3</MenuItem>
                        <MenuItem value="4">Week 4</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Paper sx={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        rows={selectedWeeksParticipants}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                        showToolbar
                        slotProps={{
                            toolbar: {
                            csvOptions: {
                                fileName: selectedWeek === 0 ? `Sports Camp Participants Total` : `Sports Camp Participants Week ${selectedWeek}`, // Set the desired file name here
                                delimiter: ';',
                            },
                            },
                        }}
                    />
                </Paper>
            </div>
        </div>
    );
}
