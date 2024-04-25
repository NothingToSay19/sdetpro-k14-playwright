import {Locator} from "@playwright/test";
import ProductItemComponent from "./ProductItemComponent";

export default class ProductGridComponent {
    public static selector: string = '.product-grid.home-page-product-grid';

    private productGridTitle = 'strong';

    constructor(private component: Locator) {
        this.component = component;
    }

    gridComponentTitle(): Locator {
        return (this.component.locator(this.productGridTitle));
    }

    async listProductItemComponent(): Promise<ProductItemComponent[]> {
        const productItemComponents = await this.component.locator(ProductItemComponent.selector).all();
        return productItemComponents.map(comp => new ProductItemComponent(comp));
    }

    productItemComponent():ProductItemComponent {
        return new ProductItemComponent(this.component.locator(ProductItemComponent.selector));
    }

}