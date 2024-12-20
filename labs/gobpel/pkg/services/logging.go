package services

import (
    "encoding/json"
    "log"
    "net/http"
)

type LogEvent struct {
    Event string `json:"event"`
}

func logEventHandler(w http.ResponseWriter, r *http.Request) {
    var event LogEvent
    json.NewDecoder(r.Body).Decode(&event)
    log.Printf("Event: %s\n", event.Event)
}

func main() {
    http.HandleFunc("/logEvent", logEventHandler)
    http.ListenAndServe(":8084", nil)
}

