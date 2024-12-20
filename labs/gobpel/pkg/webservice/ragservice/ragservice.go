package main

import (
    "encoding/json"
    "net/http"
    "log"
)

func generateResponse(w http.ResponseWriter, r *http.Request) {
    var input map[string]string
    err := json.NewDecoder(r.Body).Decode(&input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Simulate RAG response generation
    output := map[string]string{
        "response": "RAG response",
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
    http.HandleFunc("/generateResponse", generateResponse)
    log.Fatal(http.ListenAndServe(":8087", nil))
}

