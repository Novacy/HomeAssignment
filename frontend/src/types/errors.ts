export interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

export interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}
