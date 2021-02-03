const initialState = {
    token:'',
    posts:[],
    my_posts:[],
    my_profile:{},
    posts_owners:{},
    threads:[]
}

export const MainReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FETCH_THREADS':
            return Object.assign({}, state, {
                threads: action.payload
            })
        case 'LOT_OUT':
            return Object.assign({},state, {
                token:''
            })
        case 'FETCH_POST_OWNER':
            return Object.assign({}, state, {
                posts_owners: action.payload
            })
        case 'FETCH_MY_PROFILE':
            return Object.assign({}, state, {
                my_profile: action.payload
            })
        case 'FETCH_MY_POSTS':
            return Object.assign({}, state, {
                my_posts: action.payload
            })
        case 'FETCH_POST':
            return Object.assign({}, state, {
                posts: action.payload
            })
        case 'LOGIN':
            return Object.assign({}, state, {
                token: action.payload
            })
        default:
            return state
    }
}