import { useSearchParams } from "react-router-dom";
import NavbarAdministrator from "./components/navbar";
import NoticesAdministrator from "./components/Notices";
import EventsAdministrator from "./components/events";
import BillsAdministrator from "./components/bills";
import HelpdeskAdministrator from "./components/helpdesk";
import SignupsAdministrator from "./components/signups";
import ProfileAdministrator from "./components/profile";

function AdministratorDashboard() {
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
               
                    <NoticesAdministrator />
                
                </div>
            );
        }
        if (param.get('page') === 'events') {
            return (
                <div>
                    <EventsAdministrator />
                </div>
            );
        }
        if (param.get('page') === 'bills') {
            return (
                <div>
                    <BillsAdministrator />
                </div>
            );
        }
        if (param.get('page') === 'helpdesk') {
            return (
                <div>
                    <HelpdeskAdministrator />
                </div>
            );
        }
      
       
        if (param.get('page') === 'signups') {
            return (
                <div>
                    <SignupsAdministrator />
                </div>
            );
        }
        
    if (param.get('page') === 'profile') {
        return (
            <div>
                <h1>User Manager</h1>
                <ProfileAdministrator />
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

export default AdministratorDashboard;
