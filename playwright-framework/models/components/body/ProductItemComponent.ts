import {Locator} from "@playwright/test";
import ProductGridComponent from "./ProductGridComponent";

export default class ProductItemComponent {

    public static selector: string = '.product-item';

    private productTitle: string = '.product-title a';
    private productDescription: string = '.description';
    private productPrice: string = '.prices span';

    constructor(private component: Locator) {
        this.component = component;
    }

    itemTitle(): Locator {
        return this.component.locator(this.productTitle);
    }

    itemDescription(): Locator {
        return this.component.locator(this.productDescription);
    }

    itemPrice(): Locator {
        return this.component.locator(this.productPrice);
    }
}