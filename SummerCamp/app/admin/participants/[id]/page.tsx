"use client";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import ButtonAppBar from '../../../../components/ButtonAppBar';
import Link from 'next/link';
import '../../../globals.css';
import { useParams } from "next/navigation";
import DatePicker from "../../../../components/DatePicker";


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
                window.location.href = '/admin/participants';
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ButtonAppBar />
            <div className="content admin">
                    <h1>Participant Details</h1>
                    {participant ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', backgroundColor: '#d0ffd6', padding: '20px', borderRadius: '5px' }}>
                                <p><strong>Name:</strong> {participant.first_name} {participant.last_name}</p>
                                <p><strong>Age:</strong> {participant.age}</p>
                                <p><strong>Gender:</strong> {participant.gender}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px', backgroundColor: '#d0ffd6', padding: '20px', borderRadius: '5px' }}>
                                <h2>Additional Information</h2>
                                <p>{participant.additional_information || "None"}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px', backgroundColor: '#d0ffd6', padding: '20px', borderRadius: '5px' }}>
                            <p><strong>Dates:</strong></p>
                                <DatePicker selectedDates={participant.dates ? participant.dates.map((date: string) => new Date(date)) : []} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px', backgroundColor: '#d0ffd6', padding: '20px', borderRadius: '5px' }}>
                                <h2>Payment Information</h2>
                                <p><strong>Paid in Full:</strong> {participant.paid_in_full ? "Yes" : "No"}</p>
                                <p><strong>Amount Paid:</strong> ${participant.amount_paid.toFixed(2)}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px', backgroundColor: '#d0ffd6', padding: '20px', borderRadius: '5px' }}>
                                <h2>Guardian Information</h2>
                                <p><strong>Name:</strong> {participant.guardian_first_name} {participant.guardian_last_name}</p>
                                <p><strong>Email:</strong> {participant.guardian_email}</p>
                                <p><strong>Phone:</strong> {participant.guardian_phone}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading participant details...</p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
                            <Link href={`/admin/participants/edit/${id}`}>
                                <Button variant="contained" size="small">Edit Participant</Button>
                            </Link>
                            <Link href="#">
                                <Button variant="contained" size="small" style={{ backgroundColor: 'red' }} onClick={deleteParticipantConfirm}>Delete Participant</Button>
                            </Link>
                    </div>
            </div>
    </div>
    );
}
