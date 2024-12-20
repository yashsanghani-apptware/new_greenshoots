package main

import (
    "encoding/json"
    "net/http"
    "log"
)

func generatePrompt(w http.ResponseWriter, r *http.Request) {
    var input map[string]string
    err := json.NewDecoder(r.Body).Decode(&input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Simulate prompt generation
    output := map[string]string{
        "promptResult": "generated prompt",
    }

    response, err := json.Marshal(output)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(response)
}

func main() {
    http.HandleFunc("/generatePrompt", generatePrompt)
    log.Fatal(http.ListenAndServe(":8086", nil))
}

