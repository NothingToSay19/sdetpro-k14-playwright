import {test} from "@playwright/test";
import HomePage from "../pages/HomePage";
import PageBodyComponent from "../models/components/body/PageBodyComponents";
import ProductGridComponent from "../models/components/body/ProductGridComponent";
import ProductItemComponent from "../models/components/body/ProductItemComponent";

test('Test Component Page', async ({page})=> {
    await page.goto("https://demowebshop.tricentis.com/");
    const homePage: HomePage = new HomePage(page);
    const pageBodyComponent: PageBodyComponent = homePage.pageBodyComponent();
    const productGridComponent: ProductGridComponent = pageBodyComponent.productGridComponent();

    const productItemCompList: ProductItemComponent[] = await productGridComponent.listProductItemComponent();

    const actualGridComponentTitle = await productGridComponent.gridComponentTitle().textContent();

    console.log(`Product Grid Title: ${actualGridComponentTitle}`)

    for(let item of productItemCompList) {
        const productTitle = await item.itemTitle().textContent();
        const productPrice = await item.itemPrice().textContent();
        const productDescription = await item.itemDescription().textContent();
        // @ts-ignore
        console.log(`Product title: ${productTitle.trim()} with price ${productPrice.trim()}\nProduct description: ${productDescription.trim()}\n`);
    }
});