import React from 'react'
import { Switch, withRouter, HashRouter as Router } from 'react-router-dom'

import { BlankPageLayout } from './layouts'

import { IndexContainer } from './routes/Index'

const AppContainer = () => (
    <Router>
        <Switch>
            <BlankPageLayout exact path="/" component={IndexContainer} />
        </Switch>
    </Router>
)

export const App = withRouter(AppContainer)
export default App
