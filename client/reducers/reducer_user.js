import { CHANGE_LANGUAGE_LOCAL, BIND_USER_INFO, LOGOUT, BIND_EMPLOYEES_AUTH } from "../actions";

export default function(state = {}, action) {
    switch (action.type) {
        case BIND_USER_INFO: {
            return action.payload.data;
        }
        case CHANGE_LANGUAGE_LOCAL: {
            state.auth = { ...state.auth, language: action.payload.language };
            return { ...state };
        }
        case LOGOUT: {
            return {};
        }

        default:
            return state;
    }
}
