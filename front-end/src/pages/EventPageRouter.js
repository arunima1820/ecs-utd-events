import { useRouteMatch, Switch, Route } from "react-router-dom";
import EventPage from "./EventPage";

export default function EventPageRouter( {eventID} ) {
    let match = useRouteMatch();
    console.log("MATCH PATH: ", match.path)
    return (
            <Switch>
                <Route path={`${match.path}/:eventID`} exact component={EventPage} />
            </Switch>
    )
}