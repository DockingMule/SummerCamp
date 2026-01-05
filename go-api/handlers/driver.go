package handlers

import (
	"io"
	"net/http"
	"net/url"
	"strconv"

	"github.com/gorilla/mux"
)

// GetAllDrivers proxies drivers from the external API and streams the JSON back to the client
func GetAllDrivers(w http.ResponseWriter, r *http.Request) {
	u := url.URL{
		Scheme: "https",
		Host:   "api.openf1.org",
		Path:   "/v1/drivers",
	}
	q := u.Query()

	params := map[string]string{
		"broadcast_name": r.URL.Query().Get("broadcast_name"),
		"country_code":   r.URL.Query().Get("country_code"),
		"driver_number":  r.URL.Query().Get("driver_number"),
		"first_name":     r.URL.Query().Get("first_name"),
		"full_name":      r.URL.Query().Get("full_name"),
		"headshot_url":   r.URL.Query().Get("headshot_url"),
		"last_name":      r.URL.Query().Get("last_name"),
		"meeting_key":    r.URL.Query().Get("meeting_key"),
		"name_acronym":   r.URL.Query().Get("name_acronym"),
		"team_colour":    r.URL.Query().Get("team_colour"),
		"team_name":      r.URL.Query().Get("team_name"),
		"session_key":    r.URL.Query().Get("session_key"),
	}

	// default session_key to "latest" when not provided
	if params["session_key"] == "" {
		params["session_key"] = "latest"
	}

	for k, v := range params {
		if v != "" {
			q.Set(k, v)
		}
	}

	u.RawQuery = q.Encode()
	resp, err := http.Get(u.String())
	if err != nil {
		http.Error(w, "failed to fetch drivers: "+err.Error(), http.StatusBadGateway)
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

func GetDriver(w http.ResponseWriter, r *http.Request) {
	// Determine driver_number from query param or URL path
	driverNum := r.URL.Query().Get("driver_number")
	if driverNum == "" {
		vars := mux.Vars(r)
		driverNum = vars["driver_number"]
	}
	if driverNum == "" {
		http.Error(w, "missing driver_number (provide as query or path variable)", http.StatusBadRequest)
		return
	}
	if _, err := strconv.Atoi(driverNum); err != nil {
		http.Error(w, "invalid driver_number", http.StatusBadRequest)
		return
	}

	// Build upstream URL with query
	u := url.URL{
		Scheme: "https",
		Host:   "api.openf1.org",
		Path:   "/v1/drivers",
	}
	q := u.Query()
	q.Set("driver_number", driverNum)

	// allow overriding session_key via query, default to latest
	if sk := r.URL.Query().Get("session_key"); sk != "" {
		q.Set("session_key", sk)
	} else {
		q.Set("session_key", "latest")
	}
	u.RawQuery = q.Encode()

	// Proxy single driver from the external API and stream the JSON back to the client
	resp, err := http.Get(u.String())
	if err != nil {
		http.Error(w, "failed to fetch drivers: "+err.Error(), http.StatusBadGateway)
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

