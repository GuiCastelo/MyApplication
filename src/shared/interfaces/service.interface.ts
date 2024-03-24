import { HttpMethod, ServiceStateStatus } from "../types";

export interface ServiceStateInterface<T> {
  status: ServiceStateStatus,
  data: T,
  error: any
}

export interface ServiceConfiguration<RequestBody> {
  url: string,
  method: HttpMethod,
  body?: RequestBody,
  headers?: HeadersInit,
  queryParams?: URLSearchParams
}