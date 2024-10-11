import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import ProductRating,{ ProductRating$ChangeEvent } from "../control/ProductRating";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageToast from "sap/m/MessageToast";
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
        (<ProductRating> this.byId("rating")).reset();
        const args = <any> event.getParameter("arguments")
        const path = args.path
        const view = this.getView()

        view?.bindElement({
            path: window.decodeURIComponent(path),
            model: 'northwind'
        })
    }

    public onNavBack(): void {
        const history = History.getInstance();
        const previousHash = history.getPreviousHash();
        if (previousHash !== undefined) {
            window.history.go(-1);
        } else {
            const router = (<Component> this.getOwnerComponent()).getRouter();
            router.navTo("overview", {}, true);
        }
    }  

    onRatingChange (event : ProductRating$ChangeEvent) : void {
        console.log("Entro en onRatingChange");
        const value = event.getParameter("value");
        const resourceBundle = <ResourceBundle> (<ResourceModel> this.getView()?.getModel("i18n"))?.getResourceBundle();
        MessageToast.show(resourceBundle.getText("ratingConfirmation", [value]) || 'no text defined');
    }

}