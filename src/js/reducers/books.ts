import { http } from '../modules/http'
import {LocalStorage} from "../modules/database";
// ------------------------------------
// Constants
// ------------------------------------
export const SET_BOOKS = 'books::set_books'
export const SET_IS_LOADING = 'books::set_is_loading'
export const ADD_BOOK = 'books::add_book'

// ------------------------------------
// Actions
// ------------------------------------
const setBooks = (value) => (dispatch) => {
    dispatch({ type: SET_BOOKS, payload: value })
}

const setIsLoading = (value) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: value })
}

const fetchBooks = (email, password) => (dispatch) => {
    return new Promise((resolve) => {
        dispatch(setIsLoading(true))
        dispatch(setBooks([]))
        http.get('/books/')
            .then((response) => {
                dispatch(setIsLoading(false))
                dispatch(setBooks(response.data.splice(0, 50)))
                resolve(response)
            })
            .catch((e) => {
                dispatch(setIsLoading(false))
            })
    })
}

const saveBooks = () => (dispatch, getState) => {
    const books = getBooks(getState());
    LocalStorage.truncate('books')
    books.forEach(({kind, title, cover_thumb}) => {
        LocalStorage.insert('books', {kind, title, cover_thumb})
    })
    LocalStorage.commit();
}

const loadBooks = () => (dispatch) => {
    const books = LocalStorage.queryAll('books')
    dispatch(setBooks(books));
}

const deleteBook = (index) => (dispatch, getState) => {
    const books = getBooks(getState())
    books.splice(index, 1);
    dispatch(setBooks(books));
}

const editBook = (index, values) => (dispatch, getState) => {
    const books = getBooks(getState());
    books[index] = values;
    dispatch(setBooks(books))
}

const addBook = (values) => (dispatch) => {
    dispatch({ type: ADD_BOOK, payload: values })
}

export const actions = {
    fetchBooks,
    saveBooks,
    loadBooks,
    deleteBook,
    editBook,
    addBook,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_IS_LOADING]: (state, { payload }) => {
        return {
            ...state,
            isLoading: payload,
        }
    },
    [SET_BOOKS]: (state, { payload }) => {
        return {
            ...state,
            books: [
                ...payload
            ],
        }
    },
    [ADD_BOOK]: (state, { payload }) => {
        return {
            ...state,
            books: [
                ...state.books,
                payload
            ],
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    isLoading: false,
    books: [],
})

export default function userReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['books']
const getIsLoading = (state) => getState(state)['isLoading']
const getBooks = (state) => getState(state)['books']

export const selectors = {
    getState,
    getIsLoading,
    getBooks,
}
