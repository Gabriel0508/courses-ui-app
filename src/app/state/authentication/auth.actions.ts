import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "src/app/core/models/user.model";

export const AuthActions = createActionGroup({
    source: 'Authentication',
    events: {
        'login': props<{
            email: string,
            password: string
        }>(),
        'loginSuccess': props<{
          user: User
        }>(),
        'loginFailure': props<{
            error: string
        }>(),
        'register': props<{
            email: string,
            password: string
        }>(),
        'registerSuccess': props<{
          user: User 
        }>(),
        'registerFailure': props<{
            error: string
        }>(),
        'loginWithGoogle': emptyProps(),
        'loginWithGoogleSuccess': props<{
          user: User 
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