import {Page} from "@playwright/test";
import HeaderComponent from "../models/components/global/header/HeaderComponents";
import PageBodyComponent from "../models/components/body/PageBodyComponents";
import FooterComponent from "../models/components/global/footer/FooterComponent";

export default class HomePage {
    constructor(private page: Page) {
        this.page = page;
    }

    headerComponent(): HeaderComponent {
        return new HeaderComponent(this.page.locator(HeaderComponent.selector));
    }

    pageBodyComponent(): PageBodyComponent {
        return new PageBodyComponent(this.page.locator(PageBodyComponent.selector));
    }

    footerComponent(): FooterComponent {
        return new FooterComponent(this.page.locator(FooterComponent.selector));
    }

}