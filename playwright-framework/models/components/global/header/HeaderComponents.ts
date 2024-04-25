import {Locator} from "@playwright/test";
import SearchComponents from "./SearchComponents";

export default class HeaderComponent {
    public static selector: string = '.header';

    constructor(private component: Locator) {
        this.component = component;
    }

    searchComponent(): SearchComponents {
        return new SearchComponents(this.component.locator(SearchComponents.selector))
    }

}