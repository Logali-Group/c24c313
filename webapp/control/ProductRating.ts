import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import { MetadataOptions } from "sap/ui/core/Element";
import RatingIndicator, { RatingIndicator$LiveChangeEvent } from "sap/m/RatingIndicator";
import Label from "sap/m/Label";
import Button from "sap/m/Button";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace com.logaligroup.invoices.control 
 */

export default class ProductRating extends Control {

    constructor(idOrSettings?: string | $ProductRatingSettings);
    constructor(id?: string, settings?: $ProductRatingSettings);
    constructor(id?: string, settings?: $ProductRatingSettings) { super(id, settings); }

    static readonly metadata: MetadataOptions = {
        properties: {
            value : {
                type: "float",
                defaultValue: 0
            }
        },
        aggregations: {
            _rating: {
                type : "sap.m.RatingIndicator",
                multiple: false,
                visibility: "hidden"
            },
            _label: {
                type: "sap.m.Label",
                multiple: false,
                visibility: "hidden"
            },
            _button : {
                type: "sap.m.Button",
                multiple: false,
                visibility: "hidden"
            }
        },
        events : {
            change: {
                parameters: { 
                    value: { 
                        type: "float" 
                    } 
                }
            }
        }
    };

    init () : void {

        this.setAggregation("_rating", new RatingIndicator({
            value: this.getValue(),
            iconSize: "2rem",
            liveChange: this._onRate.bind(this)
        }));

        this.setAggregation("_label", new Label({ 
            text: "{i18n>productRatingLabelInitial}" 
        }));

        this.setAggregation("_button", new Button({ 
            text: "{i18n>productRatingButton}",
            press: this._onSubmit.bind(this)
        }).addStyleClass("productRatingButton"));
    }

    renderer = {
        apiVersion: 4,
        render: (rm: RenderManager, control: ProductRating) => {
            rm.openStart("div", control);
            rm.class("productRating")
            rm.openEnd();
            rm.renderControl(<Control> control.getAggregation("_rating"));
            rm.renderControl(<Control> control.getAggregation("_label"));
            rm.renderControl(<Control> control.getAggregation("_button"));
            rm.close("div");
        }
    }

    _onRate (event : RatingIndicator$LiveChangeEvent) : void {
        const resourceBundle = <ResourceBundle> (<ResourceModel> this.getModel("i18n"))?.getResourceBundle();
        const value = event.getParameter("value");
        const maxValue = (<RatingIndicator> event.getSource()).getMaxValue();

        this.setProperty("value", value);

        ( <Label> this.getAggregation("_label")).setText(resourceBundle.getText("productRatingLabelIndicator", [value, maxValue]));
        ( <Label> this.getAggregation("_label")).setDesign("Bold");
    }

    _onSubmit () : void {

        const resourceBundle = <ResourceBundle> (<ResourceModel> this.getModel("i18n"))?.getResourceBundle();

        (<RatingIndicator> this.getAggregation("_rating")).setEnabled(false);
        (<Button> this.getAggregation("_button")).setEnabled(false);
        (<Label> this.getAggregation("_label")).setText(resourceBundle.getText("productRatingLabelFinal"));
        
        this.fireEvent("change", {
            value: this.getValue()
        });
    }

    setValue(value : "float") : ProductRating {
        this.setProperty("value", value);
        (<RatingIndicator> this.getAggregation("_rating")).setValue(value);
        return this;
    }

    reset () : void {
        const resourceBundle = <ResourceBundle> (<ResourceModel> this.getModel("i18n"))?.getResourceBundle();
        this.setValue(0);
        (<RatingIndicator> this.getAggregation("_rating")).setEnabled(true);
        (<Button> this.getAggregation("_button")).setEnabled(true);
        (<Label> this.getAggregation("_label")).setText(resourceBundle.getText("productRatingLabelInitial"));
        ( <Label> this.getAggregation("_label")).setDesign("Standard");
    }
}