import * as React from 'react'
import {
  Route,
  Router as BrowserRouter,
  Switch,
  Redirect,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Routes } from './constants/routes'

export const history = createBrowserHistory()

export const catchChunkError = (fn, retriesLeft = 3, interval = 500) =>
  new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        // Ignore chunk cache error and retry to fetch, if cannot reload browser
        console.info(error)
        setTimeout(() => {
          if (retriesLeft === 1) {
            window.location.reload()
            return
          }
          catchChunkError(fn, retriesLeft - 1, interval).then(resolve, reject)
        }, interval)
      })
  })

const HomePage = React.lazy(() =>
  catchChunkError(() => import('./components/home-page')),
)

const Room = React.lazy(() =>
  catchChunkError(() => import('./components/room')),
)

function Router() {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path={Routes.HOME} exact component={HomePage} />
          <Route path={Routes.ROOM} exact component={Room} />
          <Redirect to={Routes.HOME} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
