package bpel

import (
    "context"
    "encoding/json"
    "encoding/xml"
    "errors"
    "io"
    "log"
    "net/http"
    "sync"
    "bytes" // Import the bytes package

    "gobpel/api"
    "gobpel/pkg/db"

    "google.golang.org/protobuf/types/known/emptypb"
)

type BPELProcess struct {
    XMLName       xml.Name       `xml:"process"`
    Name          string         `xml:"name,attr"`
    TargetNS      string         `xml:"targetNamespace,attr"`
    PartnerLinks  []PartnerLink  `xml:"partnerLinks>partnerLink"`
    Sequence      Sequence       `xml:"sequence"`
    FaultHandlers FaultHandlers  `xml:"faultHandlers"`
}

type PartnerLink struct {
    Name            string `xml:"name,attr"`
    PartnerLinkType string `xml:"partnerLinkType,attr"`
    MyRole          string `xml:"myRole,attr"`
    PartnerRole     string `xml:"partnerRole,attr"`
}

type Sequence struct {
    Invokes []Invoke `xml:"invoke"`
    Reply   Reply    `xml:"reply"`
}

type Invoke struct {
    PartnerLink string `xml:"partnerLink,attr"`
    Operation   string `xml:"operation,attr"`
    InputVar    string `xml:"inputVariable,attr"`
    OutputVar   string `xml:"outputVariable,attr"`
    FaultHandlers []Invoke `xml:"faultHandlers>invoke"`
}

type Reply struct {
    PartnerLink string `xml:"partnerLink,attr"`
    Operation   string `xml:"operation,attr"`
    Variable    string `xml:"variable,attr"`
}

type FaultHandlers struct {
    CatchAll CatchAll `xml:"catchAll"`
}

type CatchAll struct {
    Invoke Invoke `xml:"invoke"`
}

type Server struct {
    api.UnimplementedBPELProcessServiceServer
    workflows   map[string]*api.Process
    mu          sync.Mutex
    subscribers map[string][]string
}

func NewServer() *Server {
    return &Server{
        workflows:   make(map[string]*api.Process),
        subscribers: make(map[string][]string),
    }
}

func (s *Server) CreateProcess(ctx context.Context, req *api.Process) (*api.Process, error) {
    err := db.CreateProcess(req)
    if err != nil {
        return nil, err
    }

    s.mu.Lock()
    defer s.mu.Unlock()
    s.workflows[req.Name] = req
    return req, nil
}

func (s *Server) GetProcess(ctx context.Context, req *api.GetProcessRequest) (*api.Process, error) {
    return db.GetProcess(req.ProcessId)
}

func (s *Server) UpdateProcess(ctx context.Context, req *api.Process) (*api.Process, error) {
    return db.UpdateProcess(req)
}

func (s *Server) DeleteProcess(ctx context.Context, req *api.GetProcessRequest) (*emptypb.Empty, error) {
    _, err := db.DeleteProcess(req.ProcessId)
    if err != nil {
        return nil, err
    }
    return &emptypb.Empty{}, nil
}

func (s *Server) DeleteAllProcesses(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
    err := db.DeleteAllProcesses()
    if err != nil {
        return nil, err
    }
    return &emptypb.Empty{}, nil
}

func (s *Server) GetAllProcesses(ctx context.Context, req *emptypb.Empty) (*api.GetAllProcessesResponse, error) {
    processes, err := db.GetAllProcesses()
    if err != nil {
        return nil, err
    }
    return &api.GetAllProcessesResponse{Processes: processes}, nil
}

func (s *Server) ExecuteProcess(ctx context.Context, req *api.ExecuteProcessRequest) (*api.ExecuteProcessResponse, error) {
    s.mu.Lock()
    process, exists := s.workflows[req.ProcessId]
    s.mu.Unlock()
    if !exists {
        return nil, errors.New("process not found")
    }

    bpelProcess := BPELProcess{}
    err := xml.Unmarshal([]byte(process.BpelDefinition), &bpelProcess)
    if err != nil {
        return nil, err
    }

    status := s.executeBPELProcess(bpelProcess)
    return &api.ExecuteProcessResponse{
        Status:    status,
        Processes: []*api.Process{process},
    }, nil
}

func (s *Server) executeBPELProcess(bpelProcess BPELProcess) string {
    for _, invoke := range bpelProcess.Sequence.Invokes {
        // Call the corresponding microservice based on the partner link and operation
        err := s.callMicroservice(invoke)
        if err != nil {
            s.handleFault(invoke, err)
            return "BPEL process execution failed"
        }
    }

    // Handle the reply
    s.callMicroservice(Invoke{
        PartnerLink: bpelProcess.Sequence.Reply.PartnerLink,
        Operation:   bpelProcess.Sequence.Reply.Operation,
        InputVar:    bpelProcess.Sequence.Reply.Variable,
    })

    return "BPEL process executed successfully"
}

func (s *Server) callMicroservice(invoke Invoke) error {
    // Logic to call the microservice based on the invoke details
    // For simplicity, we assume all microservices are HTTP endpoints

    // Sample HTTP call to the microservice
    url := "http://" + invoke.PartnerLink + "/" + invoke.Operation
    payload := bytes.NewBuffer([]byte(`{"input": "` + invoke.InputVar + `"}`))

    resp, err := http.Post(url, "application/json", payload)
    if err != nil {
        // Handle error
        log.Printf("Error calling microservice: %v", err)
        return err
    }
    defer resp.Body.Close()

    _, err = io.ReadAll(resp.Body)
    if err != nil {
        // Handle error
        log.Printf("Error reading microservice response: %v", err)
        return err
    }
    return nil
}

func (s *Server) handleFault(invoke Invoke, err error) {
    log.Printf("Handling fault for invoke: %v, error: %v", invoke, err)
    for _, handler := range invoke.FaultHandlers {
        s.callMicroservice(handler)
    }
}

func (s *Server) Publish(ctx context.Context, req *api.PublishRequest) (*emptypb.Empty, error) {
    var result interface{}
    var err error

    switch req.RunMethod {
    case "GetAllProcesses":
        result, err = s.GetAllProcesses(ctx, &emptypb.Empty{})
    default:
        return nil, errors.New("unsupported runMethod")
    }

    if err != nil {
        return nil, err
    }

    resultJSON, err := json.Marshal(result)
    if err != nil {
        return nil, err
    }

    _, err = http.Post(req.ResultsServer, "application/json", bytes.NewBuffer(resultJSON))
    if err != nil {
        return nil, err
    }

    return &emptypb.Empty{}, nil
}

func (s *Server) Subscribe(ctx context.Context, req *api.SubscribeRequest) (*emptypb.Empty, error) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.subscribers[req.EventType] = append(s.subscribers[req.EventType], req.NotifyURL)
    return &emptypb.Empty{}, nil
}

func (s *Server) GetProcessStatus(ctx context.Context, req *api.GetProcessStatusRequest) (*api.GetProcessStatusResponse, error) {
    // Implement logic to get the status of a process
    return &api.GetProcessStatusResponse{Status: "Active"}, nil
}

