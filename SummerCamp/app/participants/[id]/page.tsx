"use client";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import Link from 'next/link';
import '../../globals.css';
import { useParams } from "next/navigation";
import DatePicker from "../../../components/DatePicker";


export default function App() {

    const { id } = useParams();

    const [participant, setParticipant] = useState<any>(null);

    function deleteParticipant() {
        async function deleteData() {
            try {
                const response = await fetch(`http://localhost:8080/participants/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    console.error("Failed to delete participant", response.status);
                    return;
                }
                // Redirect to participants list after deletion
                window.location.href = '/participants';
            } catch (err: any) {
                console.error("Error deleting participant:", err);
            }
        }
        deleteData();
    }

    function deleteParticipantConfirm() {
        if (confirm("Are you sure you want to delete this participant? This action cannot be undone.")) {
            deleteParticipant();
        }
    }

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        async function load() {
            try {
                const response = await fetch(`http://localhost:8080/participants/${id}`, { signal: controller.signal });
                if (!response.ok) {
                    console.error("Failed to fetch participant", response.status);
                    return;
                }
                const data = await response.json();
                if (mounted) setParticipant(data);
            } catch (err: any) {
                if (err.name === 'AbortError') return;
                console.error("Error fetching participant:", err);
            }
        }

        load();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);

    return (
       <div className="content admin">
            <h1>Participant Details</h1>
            {participant ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p><strong>Name:</strong> {participant.first_name} {participant.last_name}</p>
                    <p><strong>Age:</strong> {participant.age}</p>
                    <p><strong>Gender:</strong> {participant.gender}</p>
                    <p><strong>Dates:</strong></p> 
                    <DatePicker selectedDates={participant.dates ? participant.dates.map((date: string) => new Date(date)) : []} />
                    <p><strong>Additional Information:</strong> {participant.additional_information}</p>
                    <h1>Guardian Information</h1>
                    <p><strong>Guardian Name:</strong> {participant.guardian_first_name} {participant.guardian_last_name}</p>
                    <p><strong>Guardian Email:</strong> {participant.guardian_email}</p>
                    <p><strong>Guardian Phone:</strong> {participant.guardian_phone}</p>
                </div>
            ) : (
                <p>Loading participant details...</p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
                    <Link href={`/participants/edit/${id}`}>
                        <Button variant="contained" size="small">Edit Participant</Button>
                    </Link>
                    <Link href="#">
                        <Button variant="contained" size="small" style={{ backgroundColor: 'red' }} onClick={deleteParticipantConfirm}>Delete Participant</Button>
                    </Link>
            </div>
        </div>
    );
}
