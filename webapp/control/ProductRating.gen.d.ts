import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./ProductRating" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $ProductRatingSettings extends $ControlSettings {
        value?: number | PropertyBindingInfo | `{${string}}`;
        change?: (event: ProductRating$ChangeEvent) => void;
    }

    export default interface ProductRating {

        // property: value

        /**
         * Gets current value of property "value".
         *
         * Default value is: 0
         * @returns Value of property "value"
         */
        getValue(): number;

        /**
         * Sets a new value for property "value".
         *
         * When called with a value of "null" or "undefined", the default value of the property will be restored.
         *
         * Default value is: 0
         * @param [value=0] New value for property "value"
         * @returns Reference to "this" in order to allow method chaining
         */
        setValue(value: number): this;

        // event: change

        /**
         * Attaches event handler "fn" to the "change" event of this "ProductRating".
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ProductRating" itself.
         *
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ProductRating" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachChange(fn: (event: ProductRating$ChangeEvent) => void, listener?: object): this;

        /**
         * Attaches event handler "fn" to the "change" event of this "ProductRating".
         *
         * When called, the context of the event handler (its "this") will be bound to "oListener" if specified,
         * otherwise it will be bound to this "ProductRating" itself.
         *
         * @param data An application-specific payload object that will be passed to the event handler along with the event object when firing the event
         * @param fn The function to be called when the event occurs
         * @param listener Context object to call the event handler with. Defaults to this "ProductRating" itself
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        attachChange<CustomDataType extends object>(data: CustomDataType, fn: (event: ProductRating$ChangeEvent, data: CustomDataType) => void, listener?: object): this;

        /**
         * Detaches event handler "fn" from the "change" event of this "ProductRating".
         *
         * The passed function and listener object must match the ones used for event registration.
         *
         * @param fn The function to be called, when the event occurs
         * @param listener Context object on which the given function had to be called
         * @returns Reference to "this" in order to allow method chaining
         */
        detachChange(fn: (event: ProductRating$ChangeEvent) => void, listener?: object): this;

        /**
         * Fires event "change" to attached listeners.
         *
         * @param parameters Parameters to pass along with the event
         * @param [mParameters.value]
         *
         * @returns Reference to "this" in order to allow method chaining
         */
        fireChange(parameters?: ProductRating$ChangeEventParameters): this;
    }

    /**
     * Interface describing the parameters of ProductRating's 'change' event.
     */
    export interface ProductRating$ChangeEventParameters {
        value?: number;
    }

    /**
     * Type describing the ProductRating's 'change' event.
     */
    export type ProductRating$ChangeEvent = Event<ProductRating$ChangeEventParameters>;
}
