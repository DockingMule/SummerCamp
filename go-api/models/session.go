package models

// Session represents a session structure returned by the upstream API
// and matches the requested JSON shape.
type Session struct {
    CircuitKey       int    `json:"circuit_key"`
    CircuitShortName string `json:"circuit_short_name"`
    CountryCode      string `json:"country_code"`
    CountryKey       int    `json:"country_key"`
    CountryName      string `json:"country_name"`
    DateEnd          string `json:"date_end"`
    DateStart        string `json:"date_start"`
    GMTOffset        string `json:"gmt_offset"`
    Location         string `json:"location"`
    MeetingKey       int    `json:"meeting_key"`
    SessionKey       int    `json:"session_key"`
    SessionName      string `json:"session_name"`
    SessionType      string `json:"session_type"`
    Year             int    `json:"year"`
}
