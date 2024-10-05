import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from 'sap/ui/model/Filter';
import FilterOperator from "sap/ui/model/FilterOperator";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import ListBinding from "sap/ui/model/ListBinding";
import Component from "../Component";
import Event from "sap/ui/base/Event";
import ObjectListItem from "sap/m/ObjectListItem";
import Context from "sap/ui/model/Context";

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

    public onFilterInvoices (event : SearchField$SearchEvent) : void {
        const filters = []
        const value = event.getParameter("query")
        // console.log(event.getParameters().query);
        // console.log(event.getParameter("query"));
        //ShipperName

        if (value) {
            filters.push(
                new Filter({
                    filters:[
                        new Filter("ProductName", FilterOperator.Contains, value),
                        new Filter("ShipperName", FilterOperator.Contains, value)
                    ],
                    and: false
                })
            )
        }

        const list = this.byId("List")
        const binding = list?.getBinding("items") as ListBinding
            binding.filter(filters)
    }

    public onNavToDetail (event: Event) : void {
        const item = event.getSource() as ObjectListItem
        const bindingContext = item.getBindingContext("northwind") as Context
        const path = bindingContext.getPath()

        //this.getRouter() --> Component.ts
        const router = (this.getOwnerComponent() as Component).getRouter();
            router.navTo("RouteDetails", {
                path: window.encodeURIComponent(path)
            });
    }
}