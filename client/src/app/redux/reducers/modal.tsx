const initialState = {
    modal: {
        open: false,
        datas: {
            type: '',
            title: '',
            description: '',
            content: '',
        },
    },
    confirmModal: {
        open: false,
        datas: {
            type: '',
            title: '',
            description: '',
            txtCancel: '아니오',
            txtConfirm: '예',
        },
    },
    slide: {
        open: false,
        datas: {
            type: '',
            title: '',
            content: '',
        },
    },
};

export const modalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'OPEN_POPUP_MODAL':
            return Object.assign({}, state, {
                ...state,
                modal: {
                    open: true,
                    datas: action.data,
                    title: action.title,
                },
            });
        case 'CLOSE_POPUP_MODAL':
            return Object.assign({}, state, {
                ...state,
                modal: {
                    ...initialState.modal,
                },
            });
        case 'OPEN_SLIDE_MODAL':
            return Object.assign({}, state, {
                ...state,
                slide: {
                    open: true,
                    datas: action.data,
                    title: action.title,
                },
            });
        case 'CLOSE_SLIDE_MODAL':
            return Object.assign({}, state, {
                ...state,
                slide: {
                    ...initialState.modal,
                },
            });
        default:
            return state;
    }
};
