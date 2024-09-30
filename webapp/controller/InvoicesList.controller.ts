import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.logaligroup.invoices.controller
 */

export default class InvoicesList extends Controller {

    public onInit() : void {
        this.loadModel();
        this.loadCurrency();
    };

    private loadCurrency() : void {
        const oData = {
            usd: "USD"
        };
        const oModel = new JSONModel(oData);
        this.getView()?.setModel(oModel, 'currency');
    }

    private loadModel(): void {
        let oModel = new JSONModel();
            oModel.loadData('../model/Invoices.json');
        this.getView()?.setModel(oModel, 'invoices2');
    }
}