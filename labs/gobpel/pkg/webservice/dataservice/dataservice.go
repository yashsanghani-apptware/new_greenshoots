package main

import (
    "encoding/json"
    "net/http"
    "log"
)

func fetchData(w http.ResponseWriter, r *http.Request) {
    var input map[string]string
    err := json.NewDecoder(r.Body).Decode(&input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Simulate data fetching
    output := map[string]string{
        "data": "raw data",
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
    http.HandleFunc("/fetchData", fetchData)
    log.Fatal(http.ListenAndServe(":8081", nil))
}

