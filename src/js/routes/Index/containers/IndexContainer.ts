import { connect } from 'react-redux'
import { IndexView } from '../components/Index'
import { bindActionCreators } from 'redux'
import {actions, selectors} from "../../../reducers/books";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchBooks: actions.fetchBooks,
        saveBooks: actions.saveBooks,
        loadBooks: actions.loadBooks,
        deleteBook: actions.deleteBook,
        editBook: actions.editBook,
        addBook: actions.addBook,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        isLoading: selectors.getIsLoading(state),
        books: selectors.getBooks(state)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
