package models

// Driver represents a driver in the database
type Driver struct {
  BroadcastName string `json:"broadcast_name"`
  CountryCode   string `json:"country_code"`
  DriverNumber  int    `json:"driver_number"`
  FirstName     string `json:"first_name"`
  FullName      string `json:"full_name"`
  HeadshotURL   string `json:"headshot_url"`
  LastName      string `json:"last_name"`
  MeetingKey    int    `json:"meeting_key"`
  NameAcronym   string `json:"name_acronym"`
  SessionKey    int    `json:"session_key"`
  TeamColour    string `json:"team_colour"`
  TeamName      string `json:"team_name"`
}
