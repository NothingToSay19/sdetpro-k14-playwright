import {Page, test} from "@playwright/test";
import HomePage from "../pages/HomePage";
import HeaderComponent from "../models/components/global/header/HeaderComponents";
import SearchComponents from "../models/components/global/header/SearchComponents";

test('Test Component Page', async ({page})=> {
    await page.goto("https://demowebshop.tricentis.com/");
    const homePage: HomePage = new HomePage(page);
    const headerComponent: HeaderComponent = homePage.headerComponent();
    const searchComponent: SearchComponents = headerComponent.searchComponent();

    await searchComponent.searchBox().click();
    await searchComponent.searchBox().fill('laptop');
    await searchComponent.searchBtn().click();

    await page.waitForTimeout(3000);

});