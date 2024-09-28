import Controller from 'sap/ui/core/mvc/Controller';
import MessageToast from "sap/m/MessageToast";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Dialog from 'sap/m/Dialog';
import JSONModel from 'sap/ui/model/json/JSONModel';

/**
 * @namespace com.logaligroup.invoices.controller
 */


export default class HelloPanel extends Controller {

    private dialog : Dialog

    public onInit(): void {
        this.formModel();
    }

    private formModel() : void {
        const oData = {
            FirstName: "",
            LastName: ""
        }
        const oModel = new JSONModel(oData);
        this.getView()?.setModel(oModel, 'form');
    }

    public onShowMessage() : void {
        let oResourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n"))?.getResourceBundle();
        MessageToast.show(oResourceBundle.getText("message") || 'no text defined');
    }

    public async onOpenDialog() : Promise<void> {
        this.dialog??= await <Promise<Dialog>> this.loadFragment({
            name: "com.logaligroup.invoices.fragment.HelloDialog"
        })
        this.dialog.open();
    }

    public onCloseDialog() : void {
        (<Dialog>this.getView()?.byId("helloDialog"))?.close();
        this.formModel();
    }
}