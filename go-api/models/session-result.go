package models

type SessionResult struct {
    DNF          bool    `json:"dnf"`
    DNS          bool    `json:"dns"`
    DSQ          bool    `json:"dsq"`
    DriverNumber int     `json:"driver_number"`
    Duration     float64 `json:"duration"`
    GapToLeader  float64 `json:"gap_to_leader"`
    NumberOfLaps int     `json:"number_of_laps"`
    MeetingKey   int     `json:"meeting_key"`
    Position     int     `json:"position"`
    SessionKey   int     `json:"session_key"`
}