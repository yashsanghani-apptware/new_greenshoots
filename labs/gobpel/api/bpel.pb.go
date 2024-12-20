// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.34.2
// 	protoc        v5.27.1
// source: api/bpel.proto

package api

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	_ "google.golang.org/protobuf/types/known/anypb"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Process struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name                string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	TargetNamespace     string `protobuf:"bytes,2,opt,name=targetNamespace,proto3" json:"targetNamespace,omitempty"`
	QueryLanguage       string `protobuf:"bytes,3,opt,name=queryLanguage,proto3" json:"queryLanguage,omitempty"`
	ExpressionLanguage  string `protobuf:"bytes,4,opt,name=expressionLanguage,proto3" json:"expressionLanguage,omitempty"`
	SuppressJoinFailure bool   `protobuf:"varint,5,opt,name=suppressJoinFailure,proto3" json:"suppressJoinFailure,omitempty"`
	ExitOnStandardFault bool   `protobuf:"varint,6,opt,name=exitOnStandardFault,proto3" json:"exitOnStandardFault,omitempty"`
	BpelDefinition      string `protobuf:"bytes,7,opt,name=bpelDefinition,proto3" json:"bpelDefinition,omitempty"`
}

func (x *Process) Reset() {
	*x = Process{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_bpel_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Process) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Process) ProtoMessage() {}

func (x *Process) ProtoReflect() protoreflect.Message {
	mi := &file_api_bpel_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Process.ProtoReflect.Descriptor instead.
func (*Process) Descriptor() ([]byte, []int) {
	return file_api_bpel_proto_rawDescGZIP(), []int{0}
}

func (x *Process) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Process) GetTargetNamespace() string {
	if x != nil {
		return x.TargetNamespace
	}
	return ""
}

func (x *Process) GetQueryLanguage() string {
	if x != nil {
		return x.QueryLanguage
	}
	return ""
}

func (x *Process) GetExpressionLanguage() string {
	if x != nil {
		return x.ExpressionLanguage
	}
	return ""
}

func (x *Process) GetSuppressJoinFailure() bool {
	if x != nil {
		return x.SuppressJoinFailure
	}
	return false
}

func (x *Process) GetExitOnStandardFault() bool {
	if x != nil {
		return x.ExitOnStandardFault
	}
	return false
}

func (x *Process) GetBpelDefinition() string {
	if x != nil {
		return x.BpelDefinition
	}
	return ""
}

type GetProcessRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ProcessId string `protobuf:"bytes,1,opt,name=processId,proto3" json:"processId,omitempty"`
}

func (x *GetProcessRequest) Reset() {
	*x = GetProcessRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_bpel_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetProcessRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetProcessRequest) ProtoMessage() {}

func (x *GetProcessRequest) ProtoReflect() protoreflect.Message {
	mi := &file_api_bpel_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetProcessRequest.ProtoReflect.Descriptor instead.
func (*GetProcessRequest) Descriptor() ([]byte, []int) {
	return file_api_bpel_proto_rawDescGZIP(), []int{1}
}

func (x *GetProcessRequest) GetProcessId() string {
	if x != nil {
		return x.ProcessId
	}
	return ""
}

type GetAllProcessesResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Processes []*Process `protobuf:"bytes,1,rep,name=processes,proto3" json:"processes,omitempty"`
}

func (x *GetAllProcessesResponse) Reset() {
	*x = GetAllProcessesResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_bpel_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetAllProcessesResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetAllProcessesResponse) ProtoMessage() {}

func (x *GetAllProcessesResponse) ProtoReflect() protoreflect.Message {
	mi := &file_api_bpel_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetAllProcessesResponse.ProtoReflect.Descriptor instead.
func (*GetAllProcessesResponse) Descriptor() ([]byte, []int) {
	return file_api_bpel_proto_rawDescGZIP(), []int{2}
}

func (x *GetAllProcessesResponse) GetProcesses() []*Process {
	if x != nil {
		return x.Processes
	}
	return nil
}

type ExecuteProcessRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ProcessId string `protobuf:"bytes,1,opt,name=processId,proto3" json:"processId,omitempty"`
}

func (x *ExecuteProcessRequest) Reset() {
	*x = ExecuteProcessRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_bpel_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ExecuteProcessRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ExecuteProcessRequest) ProtoMessage() {}

func (x *ExecuteProcessRequest) ProtoReflect() protoreflect.Message {
	mi := &file_api_bpel_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ExecuteProcessRequest.ProtoReflect.Descriptor instead.
func (*ExecuteProcessRequest) Descriptor() ([]byte, []int) {
	return file_api_bpel_proto_rawDescGZIP(), []int{3}
}

func (x *ExecuteProcessRequest) GetProcessId() string {
	if x != nil {
		return x.ProcessId
	}
	return ""
}

type ExecuteProcessResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Status    string     `protobuf:"bytes,1,opt,name=status,proto3" json:"status,omitempty"`
	Processes []*Process `protobuf:"bytes,2,rep,name=processes,proto3" json:"processes,omitempty"`
}

func (x *ExecuteProcessResponse) Reset() {
	*x = ExecuteProcessResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_bpel_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ExecuteProcessResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ExecuteProcessResponse) ProtoMessage() {}

func (x *ExecuteProcessResponse) ProtoReflect() protoreflect.Message {
	mi := &file_api_bpel_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ExecuteProcessResponse.ProtoReflect.Descriptor instead.
func (*ExecuteProcessResponse) Descriptor() ([]byte, []int) {
	return file_api_bpel_proto_rawDescGZIP(), []int{4}
}

func (x *ExecuteProcessResponse) GetStatus() string {
	if x != nil {
		return x.Status
	}
	return ""
}

func (x *ExecuteProcessResponse) GetProcesses() []*Process {
	if x != nil {
		return x.Processes
	}
	return nil
}

type PublishRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ResultsServer string `protobuf:"bytes,1,opt,name=resultsServer,proto3" json:"resultsServer,omitempty"`
	RunMethod     string `protobuf:"bytes,2,opt,name=runMethod,proto3" json:"runMethod,omitempty"`
}

func (x *PublishRequest) Reset() {
	*x = PublishRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_bpel_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PublishRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PublishRequest) ProtoMessage() {}

func (x *PublishRequest) ProtoReflect() protoreflect.Message {
	mi := &file_api_bpel_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PublishRequest.ProtoReflect.Descriptor instead.
func (*PublishRequest) Descriptor() ([]byte, []int) {
	return file_api_bpel_proto_rawDescGZIP(), []int{5}
}

func (x *PublishRequest) GetResultsServer() string {
	if x != nil {
		return x.ResultsServer
	}
	return ""
}

func (x *PublishRequest) GetRunMethod() string {
	if x != nil {
		return x.RunMethod
	}
	return ""
}

type SubscribeRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	EventType string `protobuf:"bytes,1,opt,name=eventType,proto3" json:"eventType,omitempty"`
	NotifyURL string `protobuf:"bytes,2,opt,name=notifyURL,proto3" json:"notifyURL,omitempty"`
}

func (x *SubscribeRequest) Reset() {
	*x = SubscribeRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_bpel_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SubscribeRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SubscribeRequest) ProtoMessage() {}

func (x *SubscribeRequest) ProtoReflect() protoreflect.Message {
	mi := &file_api_bpel_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SubscribeRequest.ProtoReflect.Descriptor instead.
func (*SubscribeRequest) Descriptor() ([]byte, []int) {
	return file_api_bpel_proto_rawDescGZIP(), []int{6}
}

func (x *SubscribeRequest) GetEventType() string {
	if x != nil {
		return x.EventType
	}
	return ""
}

func (x *SubscribeRequest) GetNotifyURL() string {
	if x != nil {
		return x.NotifyURL
	}
	return ""
}

type GetProcessStatusRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ProcessId string `protobuf:"bytes,1,opt,name=processId,proto3" json:"processId,omitempty"`
}

func (x *GetProcessStatusRequest) Reset() {
	*x = GetProcessStatusRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_bpel_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetProcessStatusRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetProcessStatusRequest) ProtoMessage() {}

func (x *GetProcessStatusRequest) ProtoReflect() protoreflect.Message {
	mi := &file_api_bpel_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetProcessStatusRequest.ProtoReflect.Descriptor instead.
func (*GetProcessStatusRequest) Descriptor() ([]byte, []int) {
	return file_api_bpel_proto_rawDescGZIP(), []int{7}
}

func (x *GetProcessStatusRequest) GetProcessId() string {
	if x != nil {
		return x.ProcessId
	}
	return ""
}

type GetProcessStatusResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Status string `protobuf:"bytes,1,opt,name=status,proto3" json:"status,omitempty"`
}

func (x *GetProcessStatusResponse) Reset() {
	*x = GetProcessStatusResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_api_bpel_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetProcessStatusResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetProcessStatusResponse) ProtoMessage() {}

func (x *GetProcessStatusResponse) ProtoReflect() protoreflect.Message {
	mi := &file_api_bpel_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetProcessStatusResponse.ProtoReflect.Descriptor instead.
func (*GetProcessStatusResponse) Descriptor() ([]byte, []int) {
	return file_api_bpel_proto_rawDescGZIP(), []int{8}
}

func (x *GetProcessStatusResponse) GetStatus() string {
	if x != nil {
		return x.Status
	}
	return ""
}

var File_api_bpel_proto protoreflect.FileDescriptor

var file_api_bpel_proto_rawDesc = []byte{
	0x0a, 0x0e, 0x61, 0x70, 0x69, 0x2f, 0x62, 0x70, 0x65, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x12, 0x04, 0x62, 0x70, 0x65, 0x6c, 0x1a, 0x19, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x61, 0x6e, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x1a, 0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62,
	0x75, 0x66, 0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xa9,
	0x02, 0x0a, 0x07, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61,
	0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x28,
	0x0a, 0x0f, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74, 0x4e, 0x61, 0x6d, 0x65, 0x73, 0x70, 0x61, 0x63,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0f, 0x74, 0x61, 0x72, 0x67, 0x65, 0x74, 0x4e,
	0x61, 0x6d, 0x65, 0x73, 0x70, 0x61, 0x63, 0x65, 0x12, 0x24, 0x0a, 0x0d, 0x71, 0x75, 0x65, 0x72,
	0x79, 0x4c, 0x61, 0x6e, 0x67, 0x75, 0x61, 0x67, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x0d, 0x71, 0x75, 0x65, 0x72, 0x79, 0x4c, 0x61, 0x6e, 0x67, 0x75, 0x61, 0x67, 0x65, 0x12, 0x2e,
	0x0a, 0x12, 0x65, 0x78, 0x70, 0x72, 0x65, 0x73, 0x73, 0x69, 0x6f, 0x6e, 0x4c, 0x61, 0x6e, 0x67,
	0x75, 0x61, 0x67, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x12, 0x65, 0x78, 0x70, 0x72,
	0x65, 0x73, 0x73, 0x69, 0x6f, 0x6e, 0x4c, 0x61, 0x6e, 0x67, 0x75, 0x61, 0x67, 0x65, 0x12, 0x30,
	0x0a, 0x13, 0x73, 0x75, 0x70, 0x70, 0x72, 0x65, 0x73, 0x73, 0x4a, 0x6f, 0x69, 0x6e, 0x46, 0x61,
	0x69, 0x6c, 0x75, 0x72, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x08, 0x52, 0x13, 0x73, 0x75, 0x70,
	0x70, 0x72, 0x65, 0x73, 0x73, 0x4a, 0x6f, 0x69, 0x6e, 0x46, 0x61, 0x69, 0x6c, 0x75, 0x72, 0x65,
	0x12, 0x30, 0x0a, 0x13, 0x65, 0x78, 0x69, 0x74, 0x4f, 0x6e, 0x53, 0x74, 0x61, 0x6e, 0x64, 0x61,
	0x72, 0x64, 0x46, 0x61, 0x75, 0x6c, 0x74, 0x18, 0x06, 0x20, 0x01, 0x28, 0x08, 0x52, 0x13, 0x65,
	0x78, 0x69, 0x74, 0x4f, 0x6e, 0x53, 0x74, 0x61, 0x6e, 0x64, 0x61, 0x72, 0x64, 0x46, 0x61, 0x75,
	0x6c, 0x74, 0x12, 0x26, 0x0a, 0x0e, 0x62, 0x70, 0x65, 0x6c, 0x44, 0x65, 0x66, 0x69, 0x6e, 0x69,
	0x74, 0x69, 0x6f, 0x6e, 0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0e, 0x62, 0x70, 0x65, 0x6c,
	0x44, 0x65, 0x66, 0x69, 0x6e, 0x69, 0x74, 0x69, 0x6f, 0x6e, 0x22, 0x31, 0x0a, 0x11, 0x47, 0x65,
	0x74, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12,
	0x1c, 0x0a, 0x09, 0x70, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x09, 0x70, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x49, 0x64, 0x22, 0x46, 0x0a,
	0x17, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x65, 0x73,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x2b, 0x0a, 0x09, 0x70, 0x72, 0x6f, 0x63,
	0x65, 0x73, 0x73, 0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x62, 0x70,
	0x65, 0x6c, 0x2e, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x52, 0x09, 0x70, 0x72, 0x6f, 0x63,
	0x65, 0x73, 0x73, 0x65, 0x73, 0x22, 0x35, 0x0a, 0x15, 0x45, 0x78, 0x65, 0x63, 0x75, 0x74, 0x65,
	0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1c,
	0x0a, 0x09, 0x70, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x09, 0x70, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x49, 0x64, 0x22, 0x5d, 0x0a, 0x16,
	0x45, 0x78, 0x65, 0x63, 0x75, 0x74, 0x65, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x2b,
	0x0a, 0x09, 0x70, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x65, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28,
	0x0b, 0x32, 0x0d, 0x2e, 0x62, 0x70, 0x65, 0x6c, 0x2e, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73,
	0x52, 0x09, 0x70, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x65, 0x73, 0x22, 0x54, 0x0a, 0x0e, 0x50,
	0x75, 0x62, 0x6c, 0x69, 0x73, 0x68, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x24, 0x0a,
	0x0d, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x73, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x0d, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x73, 0x53, 0x65, 0x72,
	0x76, 0x65, 0x72, 0x12, 0x1c, 0x0a, 0x09, 0x72, 0x75, 0x6e, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x72, 0x75, 0x6e, 0x4d, 0x65, 0x74, 0x68, 0x6f,
	0x64, 0x22, 0x4e, 0x0a, 0x10, 0x53, 0x75, 0x62, 0x73, 0x63, 0x72, 0x69, 0x62, 0x65, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x54, 0x79,
	0x70, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x65, 0x76, 0x65, 0x6e, 0x74, 0x54,
	0x79, 0x70, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x6e, 0x6f, 0x74, 0x69, 0x66, 0x79, 0x55, 0x52, 0x4c,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x6e, 0x6f, 0x74, 0x69, 0x66, 0x79, 0x55, 0x52,
	0x4c, 0x22, 0x37, 0x0a, 0x17, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x53,
	0x74, 0x61, 0x74, 0x75, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1c, 0x0a, 0x09,
	0x70, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x09, 0x70, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x49, 0x64, 0x22, 0x32, 0x0a, 0x18, 0x47, 0x65,
	0x74, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x32, 0x90,
	0x05, 0x0a, 0x12, 0x42, 0x50, 0x45, 0x4c, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x53, 0x65,
	0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x2d, 0x0a, 0x0d, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x50,
	0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x12, 0x0d, 0x2e, 0x62, 0x70, 0x65, 0x6c, 0x2e, 0x50, 0x72,
	0x6f, 0x63, 0x65, 0x73, 0x73, 0x1a, 0x0d, 0x2e, 0x62, 0x70, 0x65, 0x6c, 0x2e, 0x50, 0x72, 0x6f,
	0x63, 0x65, 0x73, 0x73, 0x12, 0x34, 0x0a, 0x0a, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f, 0x63, 0x65,
	0x73, 0x73, 0x12, 0x17, 0x2e, 0x62, 0x70, 0x65, 0x6c, 0x2e, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f,
	0x63, 0x65, 0x73, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0d, 0x2e, 0x62, 0x70,
	0x65, 0x6c, 0x2e, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x12, 0x2d, 0x0a, 0x0d, 0x55, 0x70,
	0x64, 0x61, 0x74, 0x65, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x12, 0x0d, 0x2e, 0x62, 0x70,
	0x65, 0x6c, 0x2e, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x1a, 0x0d, 0x2e, 0x62, 0x70, 0x65,
	0x6c, 0x2e, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x12, 0x40, 0x0a, 0x0d, 0x44, 0x65, 0x6c,
	0x65, 0x74, 0x65, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x12, 0x17, 0x2e, 0x62, 0x70, 0x65,
	0x6c, 0x2e, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x12, 0x44, 0x0a, 0x12, 0x44,
	0x65, 0x6c, 0x65, 0x74, 0x65, 0x41, 0x6c, 0x6c, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x65,
	0x73, 0x12, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74,
	0x79, 0x12, 0x48, 0x0a, 0x0f, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x50, 0x72, 0x6f, 0x63, 0x65,
	0x73, 0x73, 0x65, 0x73, 0x12, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x1a, 0x1d, 0x2e, 0x62,
	0x70, 0x65, 0x6c, 0x2e, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x6c, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73,
	0x73, 0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x4b, 0x0a, 0x0e, 0x45,
	0x78, 0x65, 0x63, 0x75, 0x74, 0x65, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x12, 0x1b, 0x2e,
	0x62, 0x70, 0x65, 0x6c, 0x2e, 0x45, 0x78, 0x65, 0x63, 0x75, 0x74, 0x65, 0x50, 0x72, 0x6f, 0x63,
	0x65, 0x73, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1c, 0x2e, 0x62, 0x70, 0x65,
	0x6c, 0x2e, 0x45, 0x78, 0x65, 0x63, 0x75, 0x74, 0x65, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x37, 0x0a, 0x07, 0x50, 0x75, 0x62, 0x6c,
	0x69, 0x73, 0x68, 0x12, 0x14, 0x2e, 0x62, 0x70, 0x65, 0x6c, 0x2e, 0x50, 0x75, 0x62, 0x6c, 0x69,
	0x73, 0x68, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74,
	0x79, 0x12, 0x3b, 0x0a, 0x09, 0x53, 0x75, 0x62, 0x73, 0x63, 0x72, 0x69, 0x62, 0x65, 0x12, 0x16,
	0x2e, 0x62, 0x70, 0x65, 0x6c, 0x2e, 0x53, 0x75, 0x62, 0x73, 0x63, 0x72, 0x69, 0x62, 0x65, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x12, 0x51,
	0x0a, 0x10, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f, 0x63, 0x65, 0x73, 0x73, 0x53, 0x74, 0x61, 0x74,
	0x75, 0x73, 0x12, 0x1d, 0x2e, 0x62, 0x70, 0x65, 0x6c, 0x2e, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f,
	0x63, 0x65, 0x73, 0x73, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x1e, 0x2e, 0x62, 0x70, 0x65, 0x6c, 0x2e, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f, 0x63,
	0x65, 0x73, 0x73, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x42, 0x10, 0x5a, 0x0e, 0x67, 0x6f, 0x62, 0x70, 0x65, 0x6c, 0x2f, 0x61, 0x70, 0x69, 0x3b,
	0x61, 0x70, 0x69, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_api_bpel_proto_rawDescOnce sync.Once
	file_api_bpel_proto_rawDescData = file_api_bpel_proto_rawDesc
)

func file_api_bpel_proto_rawDescGZIP() []byte {
	file_api_bpel_proto_rawDescOnce.Do(func() {
		file_api_bpel_proto_rawDescData = protoimpl.X.CompressGZIP(file_api_bpel_proto_rawDescData)
	})
	return file_api_bpel_proto_rawDescData
}

var file_api_bpel_proto_msgTypes = make([]protoimpl.MessageInfo, 9)
var file_api_bpel_proto_goTypes = []any{
	(*Process)(nil),                  // 0: bpel.Process
	(*GetProcessRequest)(nil),        // 1: bpel.GetProcessRequest
	(*GetAllProcessesResponse)(nil),  // 2: bpel.GetAllProcessesResponse
	(*ExecuteProcessRequest)(nil),    // 3: bpel.ExecuteProcessRequest
	(*ExecuteProcessResponse)(nil),   // 4: bpel.ExecuteProcessResponse
	(*PublishRequest)(nil),           // 5: bpel.PublishRequest
	(*SubscribeRequest)(nil),         // 6: bpel.SubscribeRequest
	(*GetProcessStatusRequest)(nil),  // 7: bpel.GetProcessStatusRequest
	(*GetProcessStatusResponse)(nil), // 8: bpel.GetProcessStatusResponse
	(*emptypb.Empty)(nil),            // 9: google.protobuf.Empty
}
var file_api_bpel_proto_depIdxs = []int32{
	0,  // 0: bpel.GetAllProcessesResponse.processes:type_name -> bpel.Process
	0,  // 1: bpel.ExecuteProcessResponse.processes:type_name -> bpel.Process
	0,  // 2: bpel.BPELProcessService.CreateProcess:input_type -> bpel.Process
	1,  // 3: bpel.BPELProcessService.GetProcess:input_type -> bpel.GetProcessRequest
	0,  // 4: bpel.BPELProcessService.UpdateProcess:input_type -> bpel.Process
	1,  // 5: bpel.BPELProcessService.DeleteProcess:input_type -> bpel.GetProcessRequest
	9,  // 6: bpel.BPELProcessService.DeleteAllProcesses:input_type -> google.protobuf.Empty
	9,  // 7: bpel.BPELProcessService.GetAllProcesses:input_type -> google.protobuf.Empty
	3,  // 8: bpel.BPELProcessService.ExecuteProcess:input_type -> bpel.ExecuteProcessRequest
	5,  // 9: bpel.BPELProcessService.Publish:input_type -> bpel.PublishRequest
	6,  // 10: bpel.BPELProcessService.Subscribe:input_type -> bpel.SubscribeRequest
	7,  // 11: bpel.BPELProcessService.GetProcessStatus:input_type -> bpel.GetProcessStatusRequest
	0,  // 12: bpel.BPELProcessService.CreateProcess:output_type -> bpel.Process
	0,  // 13: bpel.BPELProcessService.GetProcess:output_type -> bpel.Process
	0,  // 14: bpel.BPELProcessService.UpdateProcess:output_type -> bpel.Process
	9,  // 15: bpel.BPELProcessService.DeleteProcess:output_type -> google.protobuf.Empty
	9,  // 16: bpel.BPELProcessService.DeleteAllProcesses:output_type -> google.protobuf.Empty
	2,  // 17: bpel.BPELProcessService.GetAllProcesses:output_type -> bpel.GetAllProcessesResponse
	4,  // 18: bpel.BPELProcessService.ExecuteProcess:output_type -> bpel.ExecuteProcessResponse
	9,  // 19: bpel.BPELProcessService.Publish:output_type -> google.protobuf.Empty
	9,  // 20: bpel.BPELProcessService.Subscribe:output_type -> google.protobuf.Empty
	8,  // 21: bpel.BPELProcessService.GetProcessStatus:output_type -> bpel.GetProcessStatusResponse
	12, // [12:22] is the sub-list for method output_type
	2,  // [2:12] is the sub-list for method input_type
	2,  // [2:2] is the sub-list for extension type_name
	2,  // [2:2] is the sub-list for extension extendee
	0,  // [0:2] is the sub-list for field type_name
}

func init() { file_api_bpel_proto_init() }
func file_api_bpel_proto_init() {
	if File_api_bpel_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_api_bpel_proto_msgTypes[0].Exporter = func(v any, i int) any {
			switch v := v.(*Process); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_bpel_proto_msgTypes[1].Exporter = func(v any, i int) any {
			switch v := v.(*GetProcessRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_bpel_proto_msgTypes[2].Exporter = func(v any, i int) any {
			switch v := v.(*GetAllProcessesResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_bpel_proto_msgTypes[3].Exporter = func(v any, i int) any {
			switch v := v.(*ExecuteProcessRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_bpel_proto_msgTypes[4].Exporter = func(v any, i int) any {
			switch v := v.(*ExecuteProcessResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_bpel_proto_msgTypes[5].Exporter = func(v any, i int) any {
			switch v := v.(*PublishRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_bpel_proto_msgTypes[6].Exporter = func(v any, i int) any {
			switch v := v.(*SubscribeRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_bpel_proto_msgTypes[7].Exporter = func(v any, i int) any {
			switch v := v.(*GetProcessStatusRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_api_bpel_proto_msgTypes[8].Exporter = func(v any, i int) any {
			switch v := v.(*GetProcessStatusResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_api_bpel_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   9,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_api_bpel_proto_goTypes,
		DependencyIndexes: file_api_bpel_proto_depIdxs,
		MessageInfos:      file_api_bpel_proto_msgTypes,
	}.Build()
	File_api_bpel_proto = out.File
	file_api_bpel_proto_rawDesc = nil
	file_api_bpel_proto_goTypes = nil
	file_api_bpel_proto_depIdxs = nil
}