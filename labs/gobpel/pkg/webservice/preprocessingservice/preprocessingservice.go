package main

import (
    "encoding/json"
    "net/http"
    "log"
)

func cleanData(w http.ResponseWriter, r *http.Request) {
    var input map[string]string
    err := json.NewDecoder(r.Body).Decode(&input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Simulate data cleaning
    output := map[string]string{
        "data": "cleaned data",
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
    http.HandleFunc("/cleanData", cleanData)
    log.Fatal(http.ListenAndServe(":8082", nil))
}

