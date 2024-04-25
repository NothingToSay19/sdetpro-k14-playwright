// import {test} from "@playwright/test";
// import HomePage from "../pages/HomePage";
// import PageBodyComponent from "../models/components/body/PageBodyComponents";
// import ProductTitleComponent from "../models/components/body/ProductTitleComponent";
//
// test('Test list component in Page', async ({page}) => {
//     await page.goto("https://demowebshop.tricentis.com/");
//     const homePage: HomePage = new HomePage(page);
//     const pageBodyComponent: PageBodyComponent = homePage.pageBodyComponent();
//     const productItemCompList: ProductTitleComponent[] = await pageBodyComponent.productItemInComponentList();
//     for (let productItemComponent of productItemCompList) {
//         const productTitle = await productItemComponent.productTitle().textContent();
//         const productPrice = await productItemComponent.productPrice().textContent();
//         // @ts-ignore
//         console.log(`productTitle: ${productTitle.trim()}, productPrice: ${productPrice.trim()}`);
//     }
//
//     await page.waitForTimeout(3000);
// })