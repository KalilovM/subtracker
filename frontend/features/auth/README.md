# Auth Feature

Handles authentication and authorization.

## Entry Points

- `SignInForm` – renders the login UI.
- `useAuth` – hook to access user/session data.
- `authService` – login/logout API.

## Usage

Import only from this feature’s `index.ts` for cleaner dependencies.

## Extension

To add new provider (e.g., Google, GitHub), create new service in `services/` and register it in `index.ts`.