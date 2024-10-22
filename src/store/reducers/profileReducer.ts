import {ProfileAction, ProfileActionType, ProfileState} from "../types/profileType.ts";


const initialState: ProfileState = {
    profile: null,
};

const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
    switch (action.type) {
        case ProfileActionType.SET_PROFILE:
            return { ...state, profile: action.payload };
        case ProfileActionType.UPDATE_PROFILE:
            if (!state.profile) {
                return state;
            }
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default profileReducer;