// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setSourceMapsEnabled } from "process";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth />
            </div>
            <div className="hidden lg:block">       
                <Quote />
            </div>
        </div>
    </div>
}     

