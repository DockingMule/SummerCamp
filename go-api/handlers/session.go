package handlers

import (
	"io"
	"net/http"
	"net/url"
)

// GetAllItems retrieves all items from the database
func GetSessions(w http.ResponseWriter, r *http.Request) {
	// Proxy sessions from the external API and stream the JSON back to the client
		// Build upstream URL with query
	u := url.URL{
		Scheme: "https",
		Host:   "api.openf1.org",
		Path:   "/v1/sessions",
	}
	
    meetingKey := r.URL.Query().Get("meeting_key")
    sessionKey := r.URL.Query().Get("session_key")
    location := r.URL.Query().Get("location")
    dateStart := r.URL.Query().Get("date_start")
    dateEnd := r.URL.Query().Get("date_end")
    sessionType := r.URL.Query().Get("session_type")
    sessionName := r.URL.Query().Get("session_name")
    countryKey := r.URL.Query().Get("country_key")
    countryCode := r.URL.Query().Get("country_code")
    countryName := r.URL.Query().Get("country_name")
    circuitKey := r.URL.Query().Get("circuit_key")
    circuitShortName := r.URL.Query().Get("circuit_short_name")
    gmtOffset := r.URL.Query().Get("gmt_offset")
    year := r.URL.Query().Get("year")
    
    q := u.Query()

    if meetingKey != "" {
        q.Set("meeting_key", meetingKey)
    }
    if sessionKey != "" {
        q.Set("session_key", sessionKey)
    }
    if location != "" {
        q.Set("location", location)
    }
    if dateStart != "" {
        q.Set("date_start", dateStart)
    }
    if dateEnd != "" {
        q.Set("date_end", dateEnd)
    }
    if sessionType != "" {
        q.Set("session_type", sessionType)
    }
    if sessionName != "" {
        q.Set("session_name", sessionName)
    }
    if countryKey != "" {
        q.Set("country_key", countryKey)
    }
    if countryCode != "" {
        q.Set("country_code", countryCode)
    }
    if countryName != "" {
        q.Set("country_name", countryName)
    }
    if circuitKey != "" {
        q.Set("circuit_key", circuitKey)
    }
    if circuitShortName != "" {
        q.Set("circuit_short_name", circuitShortName)
    }
    if gmtOffset != "" {
        q.Set("gmt_offset", gmtOffset)
    }
    if year != "" {
        q.Set("year", year)
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

