package handlers

import (
	"io"
	"net/http"
	"net/url"
)

// GetAllItems retrieves all items from the database
func GetSessionResult(w http.ResponseWriter, r *http.Request) {
	// Proxy sessions from the external API and stream the JSON back to the client
		// Build upstream URL with query
	u := url.URL{
		Scheme: "https",
		Host:   "api.openf1.org",
		Path:   "/v1/session_result",
	}


	dns := r.URL.Query().Get("dns")
	dnf := r.URL.Query().Get("dnf")
	dsq := r.URL.Query().Get("dsq")
	driver_number := r.URL.Query().Get("driver_number")
	duration := r.URL.Query().Get("duration")
	gap_to_leader := r.URL.Query().Get("gap_to_leader")
	number_of_laps := r.URL.Query().Get("number_of_laps")
	meeting_key := r.URL.Query().Get("meeting_key")
	position := r.URL.Query().Get("position")
	session_key := r.URL.Query().Get("session_key")
    
    q := u.Query()

	if dns != "" {
		q.Set("dns", dns)
	}
	if dnf != "" {
		q.Set("dnf", dnf)
	}
	if dsq != "" {
		q.Set("dsq", dsq)
	}
	if driver_number != "" {
		q.Set("driver_number", driver_number)
	}
	if duration != "" {
		q.Set("duration", duration)
	}
	if gap_to_leader != "" {
		q.Set("gap_to_leader", gap_to_leader)
	}
	if number_of_laps != "" {
		q.Set("number_of_laps", number_of_laps)
	}
	if meeting_key != "" {
		q.Set("meeting_key", meeting_key)
	}
	if position != "" {
		q.Set("position", position)
	}
	if session_key != "" {
		q.Set("session_key", session_key)
	}


	u.RawQuery = q.Encode()
	resp, err := http.Get(u.String())
	if err != nil {
		http.Error(w, "failed to fetch sessions: "+err.Error(), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		http.Error(w, "upstream error: "+resp.Status, http.StatusBadGateway)
		return
	}

	// preserve content-type from upstream (should be application/json)
	if ct := resp.Header.Get("Content-Type"); ct != "" {
		w.Header().Set("Content-Type", ct)
	} else {
		w.Header().Set("Content-Type", "application/json")
	}

	w.WriteHeader(http.StatusOK)
	if _, err := io.Copy(w, resp.Body); err != nil {
		http.Error(w, "failed to stream response: "+err.Error(), http.StatusInternalServerError)
		return
	}
}

