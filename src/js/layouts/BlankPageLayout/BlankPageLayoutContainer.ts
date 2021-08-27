import { connect } from 'react-redux'
import { BlankPageLayout } from './BlankPageLayout'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => ({
})

const BlankPageLayoutContainer = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
        },
        dispatch,
    )
})(BlankPageLayout)

export { BlankPageLayoutContainer }
export default { BlankPageLayoutContainer }
