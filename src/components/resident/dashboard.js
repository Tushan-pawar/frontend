import NoticesResident from "./components/NoticesResident";
import EventsResident from "./components/eventsResident";
import NavbarResident from "./components/navbar";
import BillsResident from "./components/BillsResident"
import { useSearchParams } from "react-router-dom";
import ProfileResident from "./components/ProfileResident";
import HelpDeskResident from "./components/HelpDeskResident";
import GateUpdate from "./components/GateUpdates";

function ResidentDashboard() {
    const [param] = useSearchParams();

    const process = () => {
        if (!param.get('page')) {
            return  <div>
            <h1>Dashboard</h1>
       </div>
       }
       if (param.get('page') === 'notices') {
        return (
            <div>
                <NoticesResident />
            
            </div>
        );
    }
    if (param.get('page') === 'events') {
        return (
            <div>
                <EventsResident />
            </div>
        );
    }
    if (param.get('page') === 'bills') {
        return (
            <div>
                
                <BillsResident />
            </div>
        );
    }

    if (param.get('page') === 'profile') {
        return (
            <div>
                <ProfileResident />
            </div>
        );
    }


    if (param.get('page') === 'gate') {
        return (
            <div>
                <GateUpdate/>
            </div>
        );
    }


    if (param.get('page') === 'helpdesk') {
        return (
            <div>
                <HelpDeskResident/>
            </div>
        );
    }

    }

    return (
        <div>
            <NavbarResident />
            {process()}
        </div>
    );
}

export default ResidentDashboard;
