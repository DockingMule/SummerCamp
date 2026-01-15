"use client";
import { useState, useEffect } from "react";
import '../globals.css';

export default function App() {
    const [participants, setParticipants] = useState<any[]>([]);

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

    return (
        <div className="content">
            <h1>Participants</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Guardian First Name</th>
                        <th>Guardian Last Name</th>
                        <th>Guardian Email</th>
                        <th>Guardian Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant: any) => (
                        <tr key={participant.id}>
                            <td>{participant.first_name}</td>
                            <td>{participant.last_name}</td>
                            <td>{participant.age}</td>
                            <td>{participant.gender}</td>
                            <td>{participant.guardian_first_name}</td>
                            <td>{participant.guardian_last_name}</td>
                            <td>{participant.guardian_email}</td>
                            <td>{participant.guardian_phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
