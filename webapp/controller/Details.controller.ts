import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import History from "sap/ui/core/routing/History";

/**
 * @namespace com.logaligroup.invoices.controller 
 * 
 */

export default class Details extends Controller {

    public onInit () : void | undefined {
        const route = (this.getOwnerComponent() as Component).getRouter()
            route.getRoute("RouteDetails")?.attachPatternMatched(this.onObjectMatched, this)
    }

    public onObjectMatched (event : Route$PatternMatchedEvent ) : void {
        const args = <any> event.getParameter("arguments")
        const path = args.path
        const view = this.getView()

        view?.bindElement({
            path: window.decodeURIComponent(path),
            model: 'northwind'
        })
    }

    public onNavToBack () : void {
        const history = History.getInstance();
        const previousHash = history.getPreviousHash();

        if (previousHash !== undefined) {
            window.history.go(-1);
        } else {
            const router = (this.getOwnerComponent() as Component).getRouter();
            router.navTo("RouteMain");
        }
    }

}