const INITIAL_STATE = {
    activeLesson: null,
    activeModule: null,
    modules: [
        {
            id: 1,
            title: "AAAAAAAAAAAA",
            leassons: [
                { id: 1, title: "aaaaaaaaa" },
                { id: 2, title: "bbbbbbbbbb" },
            ],
        },
        {
            id: 2,
            title: "BBBBBBBBBBBBBBB",
            leassons: [
                { id: 1, title: "aaaaaaaaa" },
                { id: 2, title: "bbbbbbbbbb" },
            ],
        }
    ]
}

export default function course(state = INITIAL_STATE, action) {

    console.log(action)
    // if (action.type === 'TOGLLE_LESSON') {
    //     return {
    //         ...state,
    //         activeLesson: action.lesson,
    //         activeMoudelo: action.module
    //     }
    // }

    switch (action.type) {

        case 'TOGGLE_LESSON':
            return {
                ...state,
                activeLesson: action.lesson,
                activeMoudelo: action.module
            }

        default:
            return state
    }


    // return state
}