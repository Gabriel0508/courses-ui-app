import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "firebase/auth";

export const AuthActions = createActionGroup({
    source: 'Authentication',
    events: {
        'login': props<{
            email: string,
            password: string
        }>(),
        'loginSuccess': props<{
          user: User | null
        }>(),
        'loginFailure': props<{
            error: string
        }>(),
        'register': props<{
            email: string,
            password: string
        }>(),
        'registerSuccess': props<{
          user: User | null
        }>(),
        'registerFailure': props<{
            error: string
        }>(),
        'loginWithGoogle': emptyProps(),
        'loginWithGoogleSuccess': props<{
          user: User | null
        }>(),
        'loginWithGoogleFailure': props<{
            error: string
        }>(),
        'logout': emptyProps(),
        'logoutSuccess': emptyProps(),
        'logoutFailure': props<{
            error: string
        }>(),
        'getAuthState': emptyProps(),
        'authStateChanged': props<{
            user: User | null
        }>()
    }
})