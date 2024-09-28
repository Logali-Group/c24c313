import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from 'sap/ui/model/json/JSONModel';

/**
 * @namespace com.logaligroup.invoices.controller
 */
export default class Main extends Controller {

    public variable : string

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.viewModel();
    }

    private viewModel() : void {
        const oData = {
            recipient: {
                name: "World"
                // details:[
                //     {
                //         Text: "Test"
                //     },
                //     {
                //         Text: "Test2"
                //     }
                // ]
            }
        };
        const oModel = new JSONModel(oData);
        this.getView()?.setModel(oModel, 'view');
    }


}