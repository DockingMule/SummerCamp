"use client";
import { useState, useEffect } from "react";
import { format, set } from 'date-fns';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../globals.css';
import Link from "@mui/material/Link";

export default function App() {

    const columns: GridColDef[] = [
        { field: 'first_name', headerName: 'First Name', flex: 2 },
        { field: 'last_name', headerName: 'Last name', flex: 2 },
        { field: 'age', headerName: 'Age', flex: 1, type: 'number' },
        {
            field: 'gender',
            headerName: 'Gender',
            type: 'string',
            flex: 1,
        },
        {
            field: 'details',
            headerName: 'Details',
            sortable: false,
            flex: 1,
            minWidth: 100,
            renderCell: (params: any) => {
                const id = params?.row?.id;
                return (
                    <Link href={`/participants/${id}`}>
                        <Button variant="contained" size="small">View Details</Button>
                    </Link>
                );
            },
        },
    ];

    const paginationModel = {  };

    const [participants, setParticipants] = useState<any[]>([]);
    const [selectedWeeksParticipants, setSelectedWeeksParticipants] = useState<any[]>([]);
    type WeekKey = 'week1' | 'week2' | 'week3' | 'week4';
    const [selectedWeek, setSelectedWeek] = useState<WeekKey>('week1');
    const weeks: Record<WeekKey, string[]> = {
        week1: ['06/29/2026', '06/30/2026', '07/01/2026', '07/02/2026'],
        week2: ['07/06/2026', '07/07/2026', '07/08/2026', '07/09/2026'],
        week3: ['07/13/2026', '07/14/2026', '07/15/2026', '07/16/2026'],
        week4: ['07/20/2026', '07/21/2026', '07/22/2026', '07/23/2026'],
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
            return weeks[selectedWeek].some(weekDate => participantDates.includes(weekDate));
        });
        setSelectedWeeksParticipants(selected);
    }, [participants, selectedWeek]);

    const handleChange = (event: SelectChangeEvent) => {
    setSelectedWeek(event.target.value as WeekKey);
    };

    return (
        <div className="content admin">
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Week</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedWeek}
                    label="Week"
                    onChange={handleChange}
                    >
                    <MenuItem value="week1">Week 1</MenuItem>
                    <MenuItem value="week2">Week 2</MenuItem>
                    <MenuItem value="week3">Week 3</MenuItem>
                    <MenuItem value="week4">Week 4</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Paper sx={{ height: '100%', width: '80%' }}>
                <DataGrid
                    rows={selectedWeeksParticipants}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}
