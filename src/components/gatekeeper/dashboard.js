import { useSearchParams } from "react-router-dom";
import NoticesGatekeeper from "./components/Notices";
import EventsGatekeeper from "./components/events";
import NavbarGatekeeper from "./components/navbar";
import VisitorLog from "./components/VisitorLog";
import CourierLogs from "./components/courierLog";

function GatekeeperDashboard() {
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
                    <NoticesGatekeeper />
                
                </div>
            );
        }
        if (param.get('page') === 'events') {
            return (
                <div>
                    <EventsGatekeeper />
                </div>
            );
        }
        if (param.get('page') === 'visitorLog') {
            return (
                <div>
                
                    <VisitorLog />
                </div>
            );
        }
        if (param.get('page') === 'courierLog') {
            return (
                <div>
        <CourierLogs />
                </div>
            );
        }
   
    };
    
    return (
        <div>
            <NavbarGatekeeper />
            {process()}
        </div>
    );
}

export default GatekeeperDashboard;
