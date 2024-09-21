import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @namespace com.logaligroup.invoices.controller
 */
export default class Main extends Controller {

    public variable : string

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public onShowMessage() : void {
        let oResourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n"))?.getResourceBundle();
        MessageToast.show(oResourceBundle.getText("message") || 'no text defined');
    }
}