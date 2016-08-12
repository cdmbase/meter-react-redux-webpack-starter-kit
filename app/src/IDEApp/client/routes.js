import { Route, IndexRoute } from 'react-router';
import App from './App/App';
import Hello from './App/Hello';
import Index from './App/Index';
import NotFound from './App/NotFound';
import MainLayout from './App/layouts/MainLayout';


export default (
    <Route>
        <Route path="/" component={App}>
            <IndexRoute component={ Index }/>
            <Route path="/hello/:name" component={ Hello }/>
        </Route>
        <Route path="/admin" component={ App }>
            <IndexRoute component={ Index }/>
        </Route>
        <Route path="*" component={ NotFound } />
    </Route>
);