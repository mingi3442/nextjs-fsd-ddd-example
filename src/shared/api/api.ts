import { ApiResponse } from "../types/api.types";

interface ApiConfig extends RequestInit {
  baseURL: string;
}

export class ApiClient {
  private baseURL: string;

  constructor(config: ApiConfig) {
    this.baseURL = config.baseURL;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const responseData: ApiResponse<T> = {
      data: {} as T,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      message: "",
    };

    try {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        responseData.message =
          errorData.message || `HTTP error! Status: ${response.status}`;
        throw responseData;
      }

      const data = await response.json();
      responseData.data = data;
      return responseData;
    } catch (error) {
      if (error instanceof Error) {
        responseData.message = error.message;
      }
      throw responseData;
    }
  }

  private async request<T>(
    url: string,
    config: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const fullUrl = this.baseURL + url;
      const response = await fetch(fullUrl, {
        ...config,
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw {
          data: {} as T,
          status: 500,
          statusText: "Internal Server Error",
          ok: false,
          message: error.message,
        } as ApiResponse<T>;
      }
      throw error;
    }
  }

  async get<T>(url: string, config: RequestInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: "GET" });
  }

  async post<T>(
    url: string,
    data?: unknown,
    config: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(
    url: string,
    data?: unknown,
    config: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
  async patch<T>(
    url: string,
    data?: unknown,
    config: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(
    url: string,
    config: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: "DELETE" });
  }
}

export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api",
});
