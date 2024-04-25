import {Locator} from "@playwright/test";
import ProductGridComponent from "./ProductGridComponent";
import ProductItemComponent from "./ProductItemComponent";

export default class PageBodyComponent {
    public static selector: string = '.page-body';

    constructor(private component: Locator) {
        this.component = component;
    }

    productGridComponent():ProductGridComponent {
        return new ProductGridComponent(this.component.locator(ProductGridComponent.selector));
    }
}