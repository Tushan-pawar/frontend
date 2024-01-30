import { useSearchParams } from "react-router-dom";
import NavbarAdministrator from "./components/navbar";
import BillsResident from "./components/bills";
import HelpdeskAdministrator from "./components/helpdesk";
import SignupsAdministrator from "./components/signups";
import ProfileAdministrator from "./components/profile";
import NoticesResident from "./resident/components/NoticesResident";
import EventsResident from "./resident/components/eventsResident";

function ResidentDashboard() {
    const [param] = useSearchParams();

    const process = () => {
        if(!param.get('page')){
            return  <div>
             <h1>Dashboard</h1>
        </div>
        }
        if (param.get('page') === 'notices') {
            return (
                <div>
                    <h1>Read Notices</h1>
                    <NoticesResident />
                
                </div>
            );
        }
        if (param.get('page') === 'events') {
            return (
                <div>
                    <h1>Read Events</h1>
                    <EventsResident />
                </div>
            );
        }
        if (param.get('page') === 'bills') {
            return (
                <div>
                    <h1>Create Bills</h1>
                    <BillsResident />
                </div>
            );
        }
        if (param.get('page') === 'helpdesk') {
            return (
                <div>
                    <h1>Reply to Tickets</h1>
                    <HelpDeskResident />
                </div>
            );
        }
      
        
    if (param.get('page') === 'profile') {
        return (
            <div>
                <h1>User Manager</h1>
                <ProfileResident/>
            </div>
        );
    }
   
    };
    
    return (
        <div>
            <NavbarAdministrator />
            {process()}
        </div>
    );
}

export default ResidentDashboard;
