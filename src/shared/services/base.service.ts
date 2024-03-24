import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceConfiguration } from "../interfaces/service.interface";

/**
 * Base Service for all api calls of application. OBS: When working with API that return empty response bodies,
 * use undefinied as Response generic type
 * @param serviceName: Name of the service being declared
 * @returns the response of the API call
 */
export function baseService<Response, RequestBody>(
  serviceName: string,
) {
  return createAsyncThunk<Response, ServiceConfiguration<RequestBody>, { rejectValue: string }>(
    serviceName,
    async (config, thunkApi) => {
    const response = await fetch(
      `${config.url}${config.queryParams ? `?${config.queryParams}` : ''}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...config.headers
        },
        method: config.method,
        body: JSON.stringify(config.body)
      }
    );

    if(!response.ok) {
      return thunkApi.rejectWithValue(await response.text())
    }

    // For APIs that gives empty responses, use undefinied for Response type
    const responseBody = await response.text();
    if (!responseBody) {
      return undefined as Response;
    }

    return JSON.parse(responseBody) as Response;
  });
}